const express = require('express');
const passport = require('passport');
const authRouter = express.Router();
const jsonParser = express.json();


authRouter
  .get('/login', (req, res) => {

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