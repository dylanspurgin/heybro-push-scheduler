'use strict';
var request = require('request');

module.exports = {
    sendNotification: sendNotification
};

function sendNotification (notification) {
    console.log('   - Sending notification to',notification.email);
    return new Promise(function (resolve, reject) {
        var requestOptions = {
            url: 'https://fcm.googleapis.com/fcm/send',
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': 'key=AIzaSyC6YEQrUN8tFQT8Gh9lcrmaV9rFgZv1lhs'
            },
            body: {
                to: notification.push_token,
                data: {
                    title: notification.title,
                    message: notification.message
                },
                notification: {
                    title: notification.title,
                    text: notification.message
                }
            },
            json: true
        };

        function requestCallback (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log('     - Notification sent successfully');
                resolve(response);
            } else {
                console.log('     - ERROR: Push request error',response);
                reject(response);
            }
        }
        return request(requestOptions, requestCallback);
    });
}
