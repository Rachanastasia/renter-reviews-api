const bcrypt = require('bcryptjs');

const regex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[\S]+/

const UserService = {
  hasUserWithEmail(db, email) {
    return db('users')
      .where({ email })
      .first()
      .then(r => !!r)
  },
  addUser(db, user) {
    return db
      .insert(user)
      .into('users')
  },
  validatePassword(password) {
    if (password.length < 6)
      return 'Password must be at least 6 characters long'

    if (!regex.test(password))
      return 'Password must contain at upper case and lower case letters, and numbers'

    return true;
  },
  hashPassword(password) {
    return bcrypt.hash(password, 12)
  }
}

module.exports = UserService