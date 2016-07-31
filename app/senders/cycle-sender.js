'use strict';
var request = require('request');
var firebase = require('firebase');
var moment = require('moment');
var push = require('../services/push-notification-service');

module.exports = {
    run: run
}

function run () {
    var sentAtString = moment().format('YYYY-MM-DD');
    return firebase.database().ref('notifications/pending/cycle/'+sentAtString)
        .once('value', function(notifications) {
            var promises = [];
            notifications.forEach(function (notificationSnapshot) {
                var notification = notificationSnapshot.val();
                promises.push(push.sendNotification(notification)
                    .then(function () {
                        // Set sent record
                        return firebase.database().ref('notifications/sent/cycle/'+sentAtString+'/'+notificationSnapshot.key)
                            .set(notification)
                            .then(function() {
                                // Remove pending record
                                return notificationSnapshot.ref.remove();
                            });
                    }));
            return Promise.all(promises);
        });
    });
}
