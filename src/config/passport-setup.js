const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const { CLIENT_ID, CLIENT_SECRET } = require('../config');

passport.use(new GoogleStrategy({
  callbackURL: '/auth/google/reviews',
  clientID: CLIENT_ID,
  clientSecret: CLIENT_SECRET
}, () => {
  console.log('passport callback fired')
}));