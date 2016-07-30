'use strict';
var CronJob = require('cron').CronJob;
var scheduler = require('./schedulers/scheduler');
var sender = require('./senders/sender');

var job = new CronJob({
    cronTime: '00 * * * * *',
    onTick: function() {
        console.log('Starting ---------------------------------------------------');
        console.log(' - Starting schedulers');
        scheduler.run().then(function () {
            console.log(' - Done running schedulers');
            console.log(' - Starting senders');
            sender.run().then(function () {
                console.log(' - Done running senders');
                console.log('Done.');
            });
        });
    },
    start: false, // Start automatically or require calling job.start?
    runOnInit: true, // Call onTick after creating job?
    timeZone: 'GMT'
});
job.start();
