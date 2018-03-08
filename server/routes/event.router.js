const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// add new event to database
router.post('/', (req, res) => {
    console.log('in event router', req.body);
    const query = `INSERT INTO events (speaker_id, speaker_name, title, location, date, start_time, join_code) VALUES ($1, $2, $3, $4, $5, $6, $7)`
    pool.query(query, [req.body.speaker_id, req.body.speaker_name, req.body.title, req.body.location, req.body.date, req.body.start_time, req.body.join_code])
        .then((result) => {
            console.log('result:', result);
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log('error: ', error);
            res.sendStatus(500);
        })
}) //end post

module.exports = router;