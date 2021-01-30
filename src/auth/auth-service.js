const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const AuthService = {
  comparePasswords(password, hash) {
    return bcrypt.compare(password, hash)
  },
  createJwt(subject, payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, {
      subject,
      algorithm: 'HS256'
    })
  },
  verifyJwt(token) {
    return jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ['HS256']
    })
  },
  getUserWithEmail(db, email) {
    return db('users')
      .where({ email })
      .first()
  }
}

module.exports = AuthService;