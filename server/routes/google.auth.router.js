const express = require('express');
const router = express.Router();
const googleStrategy = require('../strategies/google.strategy');

/**
 * GET /auth/google
 *
 * Ask user to authenticate with Google and authorize our app for provided scopes
 * (aka the permissions/APIs app will need). User will be prompted
 * to select a Google account.
 *
 * We are using the Google Calendar API in this example.
 * See {@link https://developers.google.com/identity/protocols/googlescopes}
 * for more available scopes.
 *
 * See {@link https://developers.google.com/identity/protocols/OpenIDConnect#authenticationuriparameters}
 * for info on more authentication parameters that might be used here.
 */
router.get('/google', googleStrategy.authenticate('google',
  {
    client_id: process.env.CLIENT_ID,
    scope: ['openid', 'profile', 'email'],
    prompt: 'select_account',
  })
);
/**
 * GET /auth/google/callback
 *
 * The callback after Google has authenticated the user with GET /auth/google.
 * Provides us with user profile info.
 *
 * IMPORTANT: URL--the first parameter below--must match
 * callbackUrl in {@link strategies/google.strategy}.
 */
router.get('/google/callback', googleStrategy.authenticate('google',
  {
    successRedirect: '/#!/join-event', // take them to their data
    failureRedirect: '/login', // take them back home to try again
  })
);
/**
 * GET /auth
 *
 * Is this request coming from a logged in user?
 *
 * @return JSON object with status (true or false) and, if true, user's name
 */

module.exports = router;