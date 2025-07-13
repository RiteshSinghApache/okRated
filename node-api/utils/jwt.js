const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

exports.verifyToken = (token) => {
  return jwt.verify(token, secret);
};

exports.generateRefreshToken = (payload, jti) => {
  return jwt.sign({ ...payload, jti }, secret, { expiresIn: '7d' });
};

exports.generateAccessToken = (payload) => {
  return jwt.sign(payload, secret, { expiresIn: '7d' });
};
