const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRE });
};

const generateRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRE });
};

exports.register = async (req, res) => {
  const { username, password, role = 'user' } = req.body;
  try {
    const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    if (rows.length > 0) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, hashedPassword, role]);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    if (rows.length === 0) return res.status(400).json({ message: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, rows[0].password);
    if (!valid) return res.status(400).json({ message: 'Invalid credentials' });

    const user = { id: rows[0].id, username: rows[0].username, role: rows[0].role };
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    await db.query('INSERT INTO refresh_tokens (user_id, token) VALUES (?, ?)', [user.id, refreshToken]);

    res.json({ accessToken, refreshToken });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

exports.sendOTP = async (req, res) => {
  const { phone } = req.body;
  const otp = generateOTP();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 mins from now

  try {
    await db.query('INSERT INTO otps (phone, otp, expires_at) VALUES (?, ?, ?)', [phone, otp, expiresAt]);
    
    // In production, you'd send the OTP via SMS API like Twilio
    console.log(`OTP for ${phone}: ${otp}`);
    
    res.json({ message: 'OTP sent successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error sending OTP', error: err });
  }
};

exports.verifyOTP = async (req, res) => {
  const { phone, otp } = req.body;

  try {
    const [rows] = await db.query(
      'SELECT * FROM otps WHERE phone = ? AND otp = ? AND expires_at > NOW() ORDER BY created_at DESC LIMIT 1',
      [phone, otp]
    );

    if (rows.length === 0) return res.status(400).json({ message: 'Invalid or expired OTP' });

    // Optional: Clean up used OTPs
    await db.query('DELETE FROM otps WHERE phone = ?', [phone]);

    // Check if user already exists
    const [userRows] = await db.query('SELECT * FROM users WHERE username = ?', [phone]);

    let user;
    if (userRows.length === 0) {
      await db.query('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [phone, '', 'user']);
      const [newUser] = await db.query('SELECT * FROM users WHERE username = ?', [phone]);
      user = newUser[0];
    } else {
      user = userRows[0];
    }

    const payload = { id: user.id, username: user.username, role: user.role };
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

    await db.query('INSERT INTO refresh_tokens (user_id, token) VALUES (?, ?)', [user.id, refreshToken]);

    res.json({ accessToken, refreshToken });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};


exports.refreshToken = async (req, res) => {
  const { token } = req.body;
  if (!token) return res.sendStatus(401);

  try {
    const [rows] = await db.query('SELECT * FROM refresh_tokens WHERE token = ?', [token]);
    if (rows.length === 0) return res.sendStatus(403);

    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      const newAccessToken = generateAccessToken({ id: user.id, username: user.username, role: user.role });
      res.json({ accessToken: newAccessToken });
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

exports.logout = async (req, res) => {
  const { token } = req.body;
  try {
    await db.query('DELETE FROM refresh_tokens WHERE token = ?', [token]);
    res.json({ message: 'Logged out' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};