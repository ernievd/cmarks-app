const express = require('express');
const router = express.Router();
const isAuthenticated = require('../modules/isAuthenticated');
const pool = require('../modules/pool');

// updating audio_url column in datab
router.put('/audioUpload/:speaker_id', (req, res) => {
    // let audio_url = req.body.audio_url;
    let event_id = 4; //req.body.event_id;
    let speaker_id = 1; //req.params.speaker_id;
    pool.query(`SELECT audio_url FROM events WHERE speaker_id = $1 AND id = $2`, [speaker_id, event_id])
        .then((result) => {
            if (result.rows[0].audio_url !== null) {
                
            }
            const query = `UPDATE events SET audio_url = $1 WHERE speaker_id = $2 AND id = $3`
            pool.query(query, [audio_url, speaker_id, event_id])
                .then((result) => {
                    console.log('result: ', result);
                    res.sendStatus(200);
                })
                .catch((error) => {
                    console.log('error:', error);
                    res.sendStatus(500);
                })
        })
        .catch((error) => {
            res.sendStatus(500);
        })

}) //end put 

module.exports = router;