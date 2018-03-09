const express = require('express');



let isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.send('Must be logged in to add items!');
}

function speakerAuthenticated(req, res, next) {
    if (req.isAuthenticated() && (req.params.speaker_id == req.user.id || req.body.speaker_id == req.user.id)) {
        return next();
    }
    res.send('Not the correct speaker');
}

module.exports = authentication = {
    isAuthenticated,
    speakerAuthenticated
};