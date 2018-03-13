const express = require('express');
const router = express.Router();
const isAuthenticated = require('../modules/isAuthenticated');
const pool = require('../modules/pool');

// updating audio_url column in datab
router.put('/audioUpload/:speaker_id', (req, res) => {
    let audio_url = req.body.audio_url;
    let event_id = req.body.event_id;
    let speaker_id = req.params.speaker_id;
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
}) //end put 

module.exports = router;