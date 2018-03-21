const express = require('express');
const router = express.Router();

/**
 * GET /auth
 * 
 * Checks if the user is logged in
 * 
 * assigns status as false if unsuccessful
 */
router.get('/', function (req, res) {
    if (req.isAuthenticated()) {
        res.json({ status: true, name: req.user.displayName });
    } else {
        res.json({ status: false });
    }
});

/**
 * GET /auth/logout
 *
 * Logs out user on the server by removing the passport session.
 *
 * @return 200 - OK
 */
router.get('/logout', function (req, res) {
    req.logout();
    res.sendStatus(200); // they made it!
});

module.exports = router;