const express = require('express');
const router = express.Router();
const generateCode = require('../modules/code-generation');
const pool = require('../modules/pool');
const checkCode = require('../modules/check-code');
const isAuthenticated = require('../modules/isAuthenticated');

// add new event to database

router.post('/', isAuthenticated, (req, res) => {
    // make sure only a logged in user can add event to their id (use req.user.id)
    let newCode;
    let foundMatch = true;
    pool.query(`SELECT join_code FROM events`)
        .then((result) => {
            newCode = checkCode(result);
            const query = `INSERT INTO events (speaker_id, speaker_name, title, location, date, start_time, join_code) VALUES ($1, $2, $3, $4, $5, $6, $7)`
            pool.query(query, [req.user.id, req.body.speaker_name, req.body.title, req.body.location, req.body.date, req.body.start_time, newCode])
                .then((result) => {
                    console.log('result:', result);
                    res.sendStatus(200);
                })
                .catch((error) => {
                    console.log('error: ', error);
                    res.sendStatus(500);
                })
        })
        .catch((error) => {
            console.log('Error');
            res.sendStatus(500);
        })

}) //end post

// get upcoming events for a particular speaker
router.get('/upcoming/:speaker_id', isAuthenticated, (req, res) => {
    console.log('in event router', req.params);
    const query = `SELECT * FROM events WHERE speaker_id = $1 AND completed = false`
    pool.query(query, [req.params.speaker_id])
        .then((result) => {
            console.log('result: ', result.rows);
            res.send(result.rows);
        })
        .catch((error) => {
            console.log('error: ', error);
        })
}) // end get

// get past events for a particular speaker
router.get('/past/:speaker_id', isAuthenticated, (req, res) => {
    console.log('in event router', req.params);
    const query = `SELECT * FROM events WHERE speaker_id = $1 AND completed = true`
    pool.query(query, [req.params.speaker_id])
        .then((result) => {
            console.log('result: ', result.rows);
            res.send(result.rows);
        })
        .catch((error) => {
            console.log('error: ', error);
        })
}) // end get

// update an event's 'complete' status to true
router.put('/complete/:id', isAuthenticated, (req, res) => {
    console.log('in event router', req.params);
    const query = `UPDATE events SET completed = true WHERE id = $1`
    pool.query(query, [req.params.id])
        .then((result) => {
            console.log('result: ', result);
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log('error:', error);
            res.sendStatus(500);
        })
}) //end put

router.put('/join/:code',isAuthenticated, (req, res) => {
    pool.query(`SELECT * FROM events WHERE join_code = $1`, [req.params.code])
        .then((result) => {
            console.log('GET event from join code', result);
            res.send(result.rows);
        })
        .catch((error) => {
            console.log('Error on GET event from join code', error);
            res.sendStatus(500);
        })
})

router.delete(`/delete/:id`, isAuthenticated, (req, res) => {
    pool.query(`UPDATE events SET join_code = null WHERE id = $1`, [req.params.id])
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((error) => {
            res.sendStatus(500);
        })
})

module.exports = router;