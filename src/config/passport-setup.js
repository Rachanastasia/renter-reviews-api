const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const { CLIENT_ID, CLIENT_SECRET } = require('../config');

passport.use(new GoogleStrategy({
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET
}), () => { })