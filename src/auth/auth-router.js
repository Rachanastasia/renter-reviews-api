const express = require('express');
const passport = require('passport');
const AuthService = require('./auth-service')


const authRouter = express.Router();
const jsonParser = express.json();


authRouter
  .get('/login', (req, res) => {

  })

  .post('/login', jsonParser, async (req, res, next) => {
    const { email, password } = req.body;
    const loginUser = { email, password };

    if (!email) return res
      .status(400)
      .json({ error: 'Missing email in request body' })

    if (!password) return res
      .status(400)
      .json({ error: 'Missing password in request body' })

    try {
      const dbUser = await AuthService.getUserWithEmail(
        req.app.get('db'),
        loginUser.email
      )
      //email does not exist
      if (!dbUser) return res
        .status(400)
        .json({ error: 'Incorrect email or password' })

      const compare = await AuthService.comparePasswords(
        loginUser.password,
        dbUser.password
      )

      if (!compare) return res
        .status(400)
        .json({ error: 'Incorrect email or password' })

      const sub = dbUser.email;
      const payload = {
        user_id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email
      }

      res.send({
        authToken: AuthService.createJwt(sub, payload)
      })

    }
    catch (error) {
      next(error)
    }

  })

  .get('/logout', (req, res) => {

  })

  .get('/google', passport.authenticate('google', {
    scope: ['profile']
  }))

  //callback for google router to redirect
  .get('/google/reviews', (req, res) => {
    res.send('you reached the callback uri')
  })


module.exports = authRouter;