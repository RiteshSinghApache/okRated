const path = require('path');
const fs = require('fs-extra');
const QRCode = require('qrcode');
const { v4: uuidv4 } = require('uuid');
const db = require('../config/db');
const { ensureDirectory } = require('../utils/fileUtils');

const qrDir = path.join(__dirname, '..', 'qr_code'); // Updated to match your static folder

exports.generateQRCode = async (req, res) => {
  const { user_id, url } = req.body;

  // ✅ Input validation
  if (!user_id || typeof user_id !== 'number') {
    return res.status(400).json({ error: 'Valid user_id is required' });
  }

  if (!url || typeof url !== 'string' || !url.startsWith('http')) {
    return res.status(400).json({ error: 'A valid URL starting with http or https is required' });
  }

  try {
    // ✅ Check if user exists
    const [userResult] = await db.query('SELECT * FROM new_users WHERE id = ?', [user_id]);
    if (userResult.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    // ✅ Ensure QR directory exists
    await ensureDirectory(qrDir);

    // ✅ Generate QR file name and path
    const fileName = `qr_${uuidv4()}.png`;
    const filePath = path.join(qrDir, fileName);
    const qrPathForDB = `/qr_code/${fileName}`; // Match your static route

    // ✅ Generate QR code image
    console.log(filePath);
    console.log(url);
    await QRCode.toFile(filePath, url, {
      errorCorrectionLevel: 'H',
      margin: 2,
      width: 300,
    });

    // ✅ Update QR path in DB for the given user
    await db.query(
      'UPDATE new_users SET qr_code_path = ? WHERE id = ?',
      [qrPathForDB, user_id]
    );

    res.status(200).json({
      message: 'QR code generated and user updated',
      user_id,
      qr_code_path: qrPathForDB,
    });

  } catch (err) {
    console.error('QR Code generation error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
