const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    if (req.isAuthenticated()) {
        console.log('trueuuuue', req.user);
        res.json({ status: true, name: req.user.displayName });
    } else {
        console.log('not truuuuuue', req.user);
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