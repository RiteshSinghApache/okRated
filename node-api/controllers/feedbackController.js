const db = require('../config/db'); // your MySQL connection

exports.submitFeedback = async (req, res) => {
  const userId = req.user.id; // from token
  const {
    name,
    email,
    phone,
    whatWentWrong = [],
    otherReason,
    improvements,
    followUp
  } = req.body;

  try {
    const feedbackQuery = `
      INSERT INTO feedbacks
      (user_id, name, email, phone, what_went_wrong, other_reason, improvements, follow_up)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await db.query(feedbackQuery, [
      userId,
      name,
      email,
      phone,
      JSON.stringify(whatWentWrong),
      otherReason || '',
      improvements || '',
      followUp ? 1 : 0
    ]);

    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (err) {
    console.error('Feedback submission error:', err);
    res.status(500).json({ error: 'Server error while submitting feedback' });
  }
};

exports.getAllFeedbacks = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }

  try {
    const [feedbacks] = await db.query(`
      SELECT f.*, u.name AS username 
      FROM feedbacks f 
      JOIN users u ON u.id = f.user_id
      ORDER BY f.created_at DESC
    `);
    res.json(feedbacks);
  } catch (err) {
    console.error('Error fetching feedbacks:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

