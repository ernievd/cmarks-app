var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth2').Strategy;
/** ---------- REQUIRE CUSTOM APP MODULES ---------- **/
// all db queries moved to a service layer, necessary for proper unit testing
const express = require('express');
const pool = require('../modules/pool.js');
const router = express.Router();

/** ---------- PASSPORT STRATEGY DEFINITION ---------- **/
passport.use('google', new GoogleStrategy({
  // identify ourselves to Google and request Google user data
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL || process.env.HEROKU-GOOGLE,
}, function (token, refreshToken, profile, done) {
  // Google has responded
  console.log(profile);

  // does this user exist in our database already?
  pool.connect(function (err, client, release) {
    client.query(`SELECT * FROM users WHERE auth_key = $1`, [profile.id],
      function (err, result) {
        var user = {};

        console.log('here');
        // Handle Errors
        if (err) {
          console.log('connection err ', err);
          done(null, user);
        }
        release();
        if (result.rows[0] != undefined) {
          user = result.rows[0];
          console.log('User obj', user);
          done(null, user);
          // Hash and compare
        } else {
          console.log('no user');
          client.query(`INSERT INTO users (auth_key) VALUES ($1)`, [profile.id],
            function (err, result) {
              if (err) {
                done(err)
              } else {
                client.query(`SELECT * FROM users WHERE auth_key = $1`, [profile.id],
                  function (err, result) {
                    if (err) {
                      console.log('connection err ', err);
                      done(null, user);
                    }
                    release();
                    if (result.rows[0] != undefined) {
                      user = result.rows[0];
                      console.log('User obj', user);
                      done(null, user);
                    }
                  })
              }
            })
        }
      })
  });
}));

module.exports = passport;