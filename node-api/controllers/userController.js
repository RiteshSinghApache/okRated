const db = require('../config/db');

exports.getProfile = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id, name, email, phone, role, qr_code_path, created_at, unique_key FROM new_users WHERE id = ?', [req.user.id]);
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
      'SELECT SELECT id, name, email, phone, role, qr_code_path, created_at, unique_key FROM new_users WHERE unique_key = ?',
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
