
var passport = require('passport');
const LinkedinStrategy = require('../strategies/linkedin.class');
/** ---------- REQUIRE CUSTOM APP MODULES ---------- **/
// all db queries moved to a service layer, necessary for proper unit testing
const express = require('express');
const pool = require('../modules/pool.js');
const router = express.Router();

// Use the LinkedinStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Linkedin
//   profile), and invoke a callback with a user object.

passport.use(new LinkedinStrategy({
	clientID: process.env.LINKEDIN_CLIENT_ID,
	clientSecret: process.env.LINKEDIN_SECRET_KEY,
	callbackURL: process.env.CALLBACK || process.env.HEROKU_LINKEDIN,
	scope: ['r_basicprofile', 'r_emailaddress'],
	passReqToCallback: true
},
	function (req, accessToken, refreshToken, profile, done) {
		// asynchronous verification, for effect...
		req.session.accessToken = accessToken;

		pool.connect(function (err, client, release) {
			client.query(`SELECT * FROM users WHERE auth_key = $1`, [profile.id],

				function (err, result) {
					var user = {};
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
	}
));

module.exports = passport;