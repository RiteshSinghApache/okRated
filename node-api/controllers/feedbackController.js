const db = require('../config/db'); // your MySQL connection

exports.submitFeedback = async (req, res) => {
  console.log('Feedback submission request:', req.body);

  const {
    unique_key,
    rating,
    name,
    email,
    phone,
    reasons = [],
    otherReason,
    improvement,
    followUp
  } = req.body;

  try {
    const feedbackQuery = `
      INSERT INTO feedbacks
      (unique_key, rating, name, email, phone, what_went_wrong, other_reason, improvements, follow_up)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await db.query(feedbackQuery, [
      unique_key || '',
      rating || null,
      name || '',
      email || '',
      phone || '',
      JSON.stringify(reasons),
      otherReason || '',
      improvement || '',
      followUp === 'Yes' ? 1 : 0
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
      SELECT f.* 
      FROM feedbacks f 
      ORDER BY f.created_at DESC
    `);
    res.json(feedbacks);
  } catch (err) {
    console.error('Error fetching feedbacks:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

