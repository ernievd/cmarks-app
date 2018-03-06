const express = require('express');
const passport = require('passport');
const LinkedinStrategy = require('../lib').Strategy;

const cookieParser = require('cookie-parser');
// morgan replaces express.logger
const morgan = require('morgan');
const session = require('express-session');
const bodyParser = require('body-parser');
const env = require('dotenv').config();
const router = express.Router();
const pool = require('../modules/pool.js');

// API Access link for creating client ID and secret:
// https://www.linkedin.com/secure/developer
const LINKEDIN_CLIENT_ID = process.env.LINKEDIN_API_KEY;
const LINKEDIN_CLIENT_SECRET = process.env.LINKEDIN_SECRET_KEY;

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete Linkedin profile is
//   serialized and deserialized.
passport.serializeUser(function (user, done) {
	done(null, user);
});

passport.deserializeUser(function (obj, done) {
	done(null, obj);
});


// Use the LinkedinStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Linkedin
//   profile), and invoke a callback with a user object.
passport.use(new LinkedinStrategy({
	clientID: LINKEDIN_CLIENT_ID,
	clientSecret: LINKEDIN_CLIENT_SECRET,
	callbackURL: "http://localhost:3000/api/linked/auth/linkedin/callback",
	scope: ['r_basicprofile', 'r_emailaddress'],
	passReqToCallback: true
},
	function (req, accessToken, refreshToken, profile, done) {
		// asynchronous verification, for effect...
		req.session.accessToken = accessToken;
		process.nextTick(function () {
			// To keep the example simple, the user's Linkedin profile is returned to
			// represent the logged-in user.  In a typical application, you would want
			// to associate the Linkedin account with a user record in your database,
			// and return that user instead.
			console.log('the access token is :', accessToken);
			console.log('profile is :', profile);

			// User has been authenticated on LinkedIn. Now check to see if they are new and if so then add them to the DB
			const authKey = profile.id;
			console.log('profile id', authKey);
			console.log('I AM IM POST');

			pool.query('SELECT * FROM users WHERE auth_key = $1', [authKey],
				(error, result) => {
					if (error) {

						console.log("Error finding data: ", error);
						// res.sendStatus(500);
					}
					// If the result.row array is empty then the user is new and we add them to the database
					else if (result.rows.length === 0) {
						console.log('New user');
						pool.query('INSERT INTO users (auth_key) VALUES ($1)', [authKey],
							(error, result) => {
								if (error) {
									console.log("Error inserting data: ", error);
									// res.sendStatus(500);
								} else {
									return done(null, profile);
									// res.sendStatus(201);
								}
							});
						return done(null, profile);
					}
					else {
						console.log('***********result is', result.rows);
						console.log('User Exists!');
						// res.sendStatus(201);
						return done(null, profile);
					}
				});
		});
	}
));


var app = express();

var envir = process.env.NODE_ENV || 'development';
if ('development' == envir) {
	// configure stuff here
	app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs');
	//app.use(express.logger());
	//app.use(morgan());
	app.use(cookieParser());
	app.use(bodyParser.json()); // to support JSON-encoded bodies
	app.use(bodyParser.urlencoded({ extended: true })); // to support URL-encoded bodies
	app.use(session({
		secret: 'keyboard cat',
		resave: false,
		saveUninitialized: true //,
		// cookie: { secure: true }
	}));

	// Initialize Passport!  Also use passport.session() middleware, to support
	// persistent login sessions (recommended).
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(express.static(__dirname + '/public'));
}

app.get('/', function (req, res) {
	res.render('index', { user: req.user });
});

app.get('/account', ensureAuthenticated, function (req, res) {
	res.render('account', { user: req.user });
});

// GET /auth/linkedin
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Linkedin authentication will involve
//   redirecting the user to linkedin.com.  After authorization, Linkedin
//   will redirect the user back to this application at /auth/linkedin/callback
//app.get('/auth/linkedin',
app.get('/auth/linkedin',
	passport.authenticate('linkedin', { state: 'SOME STATE' }),
	function (req, res) {
		// The request will be redirected to Linkedin for authentication, so this
		// function will not be called.
	});

// GET /auth/linkedin/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/linkedin/callback',
	passport.authenticate('linkedin', { failureRedirect: '/login' }),
	function (req, res) {
		console.log('I made it to the callback!!!');
		res.redirect('/');
	});


app.get('/logout', function (req, res) {
	req.logout();
	res.redirect('/');
});

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) { return next(); }
	res.redirect('/login');
}

module.exports = app;