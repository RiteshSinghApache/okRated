const db = require('../config/db');
const path = require('path');

exports.getProfile = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id, name, email, phone, role, qr_code_path, created_at, unique_key, business_name, business_type, google_business_url, business_logo FROM new_users WHERE id = ?', [req.user.id]);
    if (!rows.length) return res.status(404).json({ message: 'User not found' });

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch profile', error: err.message });
  }
};

exports.getProfileByUniqueId = async (req, res) => {
  try {
    const uniqueKey = req.params.uniqueKey;
    if (!uniqueKey) {
      return res.status(400).json({ message: 'Unique key missing' });
    }
    const [rows] = await db.query(
      'SELECT id, name, email, phone, role, qr_code_path, created_at, unique_key, business_name, business_type, google_business_url, business_logo FROM new_users WHERE unique_key = ?',
      [uniqueKey]
    );
    if (!rows.length) return res.status(404).json({ message: 'User not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch profile', error: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  const userId = req.user.id;
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required' });
  }

  try {
    const [existing] = await db.query('SELECT id, name, email, phone FROM new_users WHERE email = ? AND id != ?', [email, userId]);
    if (existing.length > 0) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    await db.query('UPDATE new_users SET name = ?, email = ? WHERE id = ?', [name, email, userId]);
    const [updatedUser] = await db.query(
      "SELECT id, name, email, phone FROM new_users WHERE id = ?",
      [userId]
    );
    res.json({ message: 'Profile updated successfully', data: updatedUser[0]});// ✅ Return updated profile
  } catch (err) {
    res.status(500).json({ message: 'Failed to complete profile', error: err.message });
  }
};

exports.uploadBusinessLogo = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No logo uploaded' });
        }

        const { business_name, business_type, google_business_url } = req.body;
        const logoUrl = `http://localhost:5001/${req.file.path.replace(/\\/g, "/")}`;
        const user_id = req.user.id;

        const updateFields = {
          ...(business_name && { business_name }),
          ...(business_type && { business_type }),
          ...(google_business_url && { google_business_url }),
          ...(logoUrl && { business_logo: logoUrl }),
        };

        const updateKeys = Object.keys(updateFields);
        const updateValues = Object.values(updateFields);
        const sql = `UPDATE new_users SET ${updateKeys.map(key => `${key} = ?`).join(', ')} WHERE id = ?`;
        await db.query(sql, [...updateValues, user_id]);

        res.json({
            success: true,
            message: 'Business profile updated',
            data: {
                business_logo: logoUrl,
                business_name,
                business_type,
                google_business_url,
            },
        });
    } catch (err) {
        console.error('Upload business logo error:', err);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};
