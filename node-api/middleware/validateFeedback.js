module.exports = (req, res, next) => {
  const { name, email, phone, rating } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Name is required.' });
  }

  if (!email) {
    return res.status(400).json({ message: 'Email is required.' });
  }

  if (!phone) {
    return res.status(400).json({ message: 'Phone number is required.' });
  }

  if (rating === undefined || rating === null) {
    return res.status(400).json({ message: 'Rating is required.' });
  }

  if (!/^\d{10}$/.test(phone)) {
    return res.status(400).json({ message: 'Invalid phone number.' });
  }

  if (rating < 1 || rating > 5) {
    return res.status(400).json({ message: 'Rating must be 1-5.' });
  }

  next();
};
