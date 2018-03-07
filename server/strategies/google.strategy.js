var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth2').Strategy;
/** ---------- REQUIRE CUSTOM APP MODULES ---------- **/
// all db queries moved to a service layer, necessary for proper unit testing
const express = require('express');
const pool = require('../modules/pool.js');
const router = express.Router();
/** ---------- PASSPORT SESSION SERIALIZATION ---------- **/

// // serialize the user onto the session
// passport.serializeUser(function (user, done) {
//   done(null, user.id);
// });

// // deserialize the user from the session and provide user object
// passport.deserializeUser(function (id, done) {
//   pool.connect(function (err, client, release) {
//     if (err) {
//       console.log('connection err ', err);
//       release();
//       done(err);
//     }

//     var user = {};

//     client.query("SELECT * FROM users WHERE id = $1", [id], function (err, result) {

//       // Handle Errors
//       if (err) {
//         console.log('query err ', err);
//         done(err);
//         release();
//       }

//       user = result.rows[0];
//       release();

//       if (!user) {
//         // user not found
//         return done(null, false, { message: 'Incorrect credentials.' });
//       } else {
//         // user found
//         console.log('User row ', user);
//         done(null, user);
//       }

//     });
//   });
// });
/** ---------- PASSPORT STRATEGY DEFINITION ---------- **/
passport.use('google', new GoogleStrategy({
  // identify ourselves to Google and request Google user data
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL,
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