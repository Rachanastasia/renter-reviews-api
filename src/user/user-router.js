const express = require('express');
const UserService = require('./user-service');

const userRouter = express.Router()
const jsonParser = express.json()

userRouter
  .post('/', jsonParser, async (req, res, next) => {
    const { password, email, nickname } = req.body

    for (const field of ['nickname', 'email', 'password'])
      if (!req.body[field]) return res
        .status(400)
        .json({ error: `Missing ${field} in request body` })


    try {
      const passwordError = UserService.validatePassword(password)

      if (passwordError) return res
        .send(400)
        .json({ error: passwordError })

      const emailError = UserService.hasUserWithEmail(
        req.app.get('db'),
        email
      )

      if (emailError) return res
        .status(400)
        .json({ error: 'Email already taken' })

      const hashedPassword = await UserService.hashPassword(password)

      const userData = {
        email,
        nickname,
        password: hashedPassword
      }

      const user = await UserService.insertUser(
        req.app.get('db'),
        userData
      )

      return res
        .status(201)
        .end()

    }

    catch (error) {
      next(error)
    }


  })

module.exports = userRouter