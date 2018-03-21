const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const isAuthenticated = require('../modules/isAuthenticated').isAuthenticated;

// Posts timestamps to database
router.post('/swipe', isAuthenticated, (req, res) => {
    let event_id = req.body.event_id;
    let user_id = req.user.id;
    let timestamp = req.body.now;
    const queryText = 'INSERT INTO cmarks (timestamp, user_id, event_id ) VALUES ($1, $2, $3)';

    pool.query(queryText, [timestamp, user_id, event_id])
        .then((result) => {
            res.sendStatus(201);
        })
        .catch((error) => {
            res.sendStatus(500);
        })
});

// posts comment to database.
router.put('/comment', isAuthenticated, (req, res) => {
    pool.query(`UPDATE cmarks SET comment = $1 WHERE id = $2`, [req.body.comment, req.body.id])
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((error) => {
            res.sendStatus(500);
        })
})


module.exports = router;