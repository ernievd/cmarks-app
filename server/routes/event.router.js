const express = require('express');
const router = express.Router();
const generateCode = require('../modules/code-generation');
const pool = require('../modules/pool.js');

router.post('/code', (req, res) => {
    let newCode = generateCode();
    pool.query(`INSERT INTO events (join_code) VALUES ($1)`, [newCode], function (err, result) {
        if (err) {
            console.log('error on code POST', err);
            res.sendStatus(500);
        } else {
            console.log('Successful code POST', result);
            res.sendStatus(201);
        }
    });
});

module.exports = router;