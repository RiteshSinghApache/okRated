const { Feedback, User } = require('../models');

exports.submitFeedback = async (req, res) => {
  try {
    const { name, email, phone, rating, reason_1, reason_2, reason_3 } = req.body;

    const feedback = await Feedback.create({
      name,
      email,
      phone,
      rating,
      reason_1,
      reason_2,
      reason_3,
      user_id: req.user.id
    });

    res.status(201).json({ message: 'Feedback submitted', feedback });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllFeedbacks = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const feedbacks = await Feedback.findAll({
      include: [{ model: User, attributes: ['name', 'email'] }],
      order: [['created_at', 'DESC']]
    });

    res.json({ feedbacks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
