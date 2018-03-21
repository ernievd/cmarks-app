const express = require('express');
const router = express.Router();
const generateCode = require('../modules/code-generation');
const pool = require('../modules/pool');
const checkCode = require('../modules/check-code');
const isAuthenticated = require('../modules/isAuthenticated').isAuthenticated;
const speakerAuthenticated = require('../modules/isAuthenticated').speakerAuthenticated;

// add new event to database
router.post('/', isAuthenticated, (req, res) => {
    let newCode;
    let foundMatch = true;
    pool.query(`SELECT join_code FROM events`)
        .then((result) => {
            newCode = checkCode(result);
            const query = `INSERT INTO events (speaker_id, speaker_name, title, location, date, start_time, join_code) VALUES ($1, $2, $3, $4, $5, $6, $7)`
            pool.query(query, [req.user.id, req.body.speaker_name, req.body.title, req.body.location, req.body.date, req.body.start_time, newCode])
                .then((result) => {
                    res.sendStatus(200);
                })
                .catch((error) => {
                    res.sendStatus(500);
                })
        })
        .catch((error) => {
            res.sendStatus(500);
        })
}) //end post

//edit an event in db
router.put('/edit/', isAuthenticated, (req, res) => {
    const query = `UPDATE events SET title = $1, speaker_name = $2, location = $3, date = $4, start_time = $5 WHERE id = $6`
    pool.query(query, [req.body.title, req.body.speaker_name, req.body.location, req.body.date, req.body.start_time, req.body.id])
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((error) => {
            res.sendStatus(500);
        })
})

// get upcoming events for a particular speaker
router.get('/upcoming/', isAuthenticated, (req, res) => {
    const query = `SELECT * FROM events WHERE speaker_id = $1 AND completed = false`
    pool.query(query, [req.user.id])
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            res.sendStatus(500);
        })
}) // end get

// get past events for a particular speaker
router.get('/past/', isAuthenticated, (req, res) => {
    const query = `SELECT * FROM events WHERE speaker_id = $1 AND completed = true`
    pool.query(query, [req.user.id])
        .then((result) => {
            console.log('result: ', result.rows);
            res.send(result.rows);
        })
        .catch((error) => {
            res.sendStatus(500);
        })
}) // end get

// update an event's 'complete' status to true
router.put('/complete/:id', isAuthenticated, (req, res) => {
    const query = `UPDATE events SET completed = true WHERE id = $1`
    pool.query(query, [req.params.id])
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((error) => {
            res.sendStatus(500);
        })
}) //end put

// getting join code for an event
router.put('/join/:code', isAuthenticated, (req, res) => {
    pool.query(`SELECT * FROM events WHERE join_code = $1`, [req.params.code])
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            res.sendStatus(500);
        })
})

// deleting join code
router.delete(`/delete/:id`, isAuthenticated, (req, res) => {
    pool.query(`UPDATE events SET join_code = null WHERE id = $1`, [req.params.id])
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((error) => {
            res.sendStatus(500);
        })
})

// getting all events an audience member attended
router.get('/audience/all', (req, res) => {
    pool.query(`SELECT event_id, title, speaker_name, location, date 
    FROM events JOIN cmarks ON events.id = cmarks.event_id 
    WHERE user_id = $1 
    GROUP BY event_id, title, speaker_name, location, date`, [req.user.id])
        .then((result) => {
            res.send(result.rows)
        })
        .catch((error) => {
            res.sendStatus(500);
        })
})

// get event info by id for an audience member
router.get('/audience/:id', isAuthenticated, (req, res) => {
    pool.query(`SELECT * FROM events JOIN cmarks ON events.id = cmarks.event_id
     WHERE user_id = $1 AND event_id = $2`, [req.user.id, req.params.id])
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            res.sendStatus(500);
        })
})

module.exports = router;