'use strict';
var request = require('request');
var CycleSender = require('./cycle-sender.js');

module.exports = {
    run: run
}

function run () {
    var promises = [];
    promises.push(CycleSender.run());
    // Add other senders here as needed
    return Promise.all(promises);
}
