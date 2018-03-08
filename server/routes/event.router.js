const express = require('express');
const router = express.Router();
const generateCode = require('../modules/code-generation');
const pool = require('../modules/pool');

// add new event to database
router.post('/', (req, res) => {
    let newCode = generateCode();
    console.log('in event router', req.body);
    const query = `INSERT INTO events (speaker_id, speaker_name, title, location, date, start_time, join_code) VALUES ($1, $2, $3, $4, $5, $6, $7)`
    pool.query(query, [req.body.speaker_id, req.body.speaker_name, req.body.title, req.body.location, req.body.date, req.body.start_time, newCode])
        .then((result) => {
            console.log('result:', result);
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log('error: ', error);
            res.sendStatus(500);
        })
}) //end post

// get upcoming events for a particular speaker
router.get('/upcoming/:speaker_id', (req, res) => {
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
router.get('/past/:speaker_id', (req, res) => {
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
router.put('/complete/:id', (req, res) => {
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

module.exports = router;