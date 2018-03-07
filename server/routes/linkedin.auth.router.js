const express = require('express');
const router = express.Router();
const linkedinStrategy = require('../strategies/linkedin.strategy');


// router.get('/', function (req, res) {
// 	console.log('req.user', req.user);
// 	res.send(req.user);
// });

// GET /auth/linkedin
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Linkedin authentication will involve
//   redirecting the user to linkedin.com.  After authorization, Linkedin
//   will redirect the user back to this application at /auth/linkedin/callback
router.get('/auth/linkedin',
	linkedinStrategy.authenticate('linkedin')
);

// GET /auth/linkedin/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get('/auth/linkedin/callback', linkedinStrategy.authenticate('linkedin',
	{
		successRedirect: '/#!/join-event',
		failureRedirect: '/login'
	})
);


module.exports = router;