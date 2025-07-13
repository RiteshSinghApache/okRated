const jwt = require('jsonwebtoken');
const db = require('../config/db');
const { generateAccessToken, generateRefreshToken } = require('../utils/jwt');
const { v4: uuidv4 } = require('uuid');

module.exports = async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ message: 'No refresh token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const userId = decoded.id;
    const oldJti = decoded.jti;

    const [rows] = await db.query('SELECT * FROM refresh_tokens WHERE user_id = ? AND token = ?', [userId, token]);
    if (!rows.length) return res.status(403).json({ message: 'Refresh token revoked or invalid' });

    await db.query('DELETE FROM refresh_tokens WHERE token = ?', [token]);

    const newJti = uuidv4();
    const newRefreshToken = generateRefreshToken({ id: userId }, newJti);
    const accessToken = generateAccessToken({ id: userId });

    await db.query('INSERT INTO refresh_tokens (user_id, token, jti) VALUES (?, ?, ?)', [userId, newRefreshToken, newJti]);

    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.cookie('token', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000
    });

    res.json({ message: 'Token refreshed successfully', accessToken });
  } catch (err) {
    return res.status(403).json({ message: 'Invalid refresh token', error: err.message });
  }
};
