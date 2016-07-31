'use strict';
var scheduler = require('./schedulers/scheduler');
var sender = require('./senders/sender');
var logger = require('./providers/logger-provider');

var express = require('express');
var app = express();

app.get('/run', function (req, res) {
    var messages = [];
    console.log('Running heybro-push-scheduler');
    console.log('Starting ---------------------------------------------------');
    console.log(' - Starting schedulers');
    scheduler.run().then(function () {
        console.log(' - Done running schedulers');
        console.log(' - Starting senders');
        sender.run().then(function () {
            console.log(' - Done running senders');
            console.log('Done.');
            res.json({'result':'success'});
        })
        .catch(function (error) {
            res.status(500).json({ error: error });
        });
    });
});

app.listen(8080, function () {
  console.log('App listening on port 8080');
});
