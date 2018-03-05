var express = require('express')
	, passport = require('passport')
	, LinkedinStrategy = require('./lib').Strategy;

//I added -
var cookieParser = require('cookie-parser');
// This replaces express.logger
var morgan = require('morgan');
var session = require('express-session');
var bodyParser = require('body-parser');

var env = require('dotenv').config();

// API Access link for creating client ID and secret:
// https://www.linkedin.com/secure/developer
var LINKEDIN_CLIENT_ID = process.env.LINKEDIN_CLIENT_ID;
var LINKEDIN_CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET;

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete Linkedin profile is
//   serialized and deserialized.
passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(obj, done) {
	done(null, obj);
});


// Use the LinkedinStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Linkedin
//   profile), and invoke a callback with a user object.
passport.use(new LinkedinStrategy({
		clientID:     LINKEDIN_CLIENT_ID,
		clientSecret: LINKEDIN_CLIENT_SECRET,
		callbackURL:  "http://localhost:3000/auth/linkedin/callback",
		scope:        [ 'r_basicprofile', 'r_emailaddress'],
		passReqToCallback: true
	},
	function(req, accessToken, refreshToken, profile, done) {
		// asynchronous verification, for effect...
		req.session.accessToken = accessToken;
		process.nextTick(function () {
			// To keep the example simple, the user's Linkedin profile is returned to
			// represent the logged-in user.  In a typical application, you would want
			// to associate the Linkedin account with a user record in your database,
			// and return that user instead.
			console.log('the access token is :', accessToken);
			console.log('profile is :', profile);
			return done(null, profile);
		});
	}
));




var app = express();

// configure Express
// app.configure(function() {
// 	app.set('views', __dirname + '/views');
// 	app.set('view engine', 'ejs');
// 	app.use(express.logger());
// 	app.use(express.cookieParser());
// 	app.use(express.urlencoded());
// 	app.use(express.json());
// 	app.use(express.session({ secret: 'keyboard cat' }));
// 	// Initialize Passport!  Also use passport.session() middleware, to support
// 	// persistent login sessions (recommended).
// 	app.use(passport.initialize());
// 	app.use(passport.session());
// 	app.use(app.router);
// 	app.use(express.static(__dirname + '/public'));
// });


var enve = process.env.NODE_ENV || 'development';
if ('development' == enve) {
	// configure stuff here
	app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs');
	//app.use(express.logger());
	//app.use(morgan());
	//app.use(express.cookieParser());
	app.use(cookieParser());
	// app.use(express.urlencoded());
	// app.use(express.json());
	app.use(bodyParser.json()); // to support JSON-encoded bodies
	app.use(bodyParser.urlencoded({ extended: true })); // to support URL-encoded bodies
	//app.use(express.session({ secret: 'keyboard cat' }));
	//app.use(session({ secret: 'keyboard cat' }));


	app.use(session({
		secret: 'keyboard cat',
		 resave: false ,
		 saveUninitialized: true //,
		// cookie: { secure: true }
	}));

	// Initialize Passport!  Also use passport.session() middleware, to support
	// persistent login sessions (recommended).
	app.use(passport.initialize());
	app.use(passport.session());
	// NOT NEEDED _ IT IS INCLUDED     app.use(app.router);
	app.use(express.static(__dirname + '/public'));
}

app.get('/', function(req, res){
	res.render('index', { user: req.user });
});

app.get('/account', ensureAuthenticated, function(req, res){
	res.render('account', { user: req.user });
});

// GET /auth/linkedin
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Linkedin authentication will involve
//   redirecting the user to linkedin.com.  After authorization, Linkedin
//   will redirect the user back to this application at /auth/linkedin/callback
app.get('/auth/linkedin',
	passport.authenticate('linkedin', { state: 'SOME STATE' }),
	function(req, res){
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
	function(req, res) {
		console.log('I made it to the callback!!!');
		res.redirect('/');
	});

app.get('/logout', function(req, res){
	req.logout();
	res.redirect('/');
});

var http = require('http');

http.createServer(app).listen(3000);


// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) { return next(); }
	res.redirect('/login');
}