
const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');


router.post('/swipe', (req, res) => {
    console.log('req.body', req.body);
    console.log('user', req.user);
    let user_id = req.user.id;
    let timestamp = req.body.actualTime;
    const queryText = 'INSERT INTO cmarks (timestamp, user_id) VALUES ($1, $2)'; 

    pool.query(queryText, [timestamp, user_id])
    .then((result) => {
        console.log('successful timestamp post', result);
        res.sendStatus(201);
    })
    .catch((error) => {
        console.log('error on timestamp post', error);
        res.sendStatus(500);
    })
});


module.exports = router;