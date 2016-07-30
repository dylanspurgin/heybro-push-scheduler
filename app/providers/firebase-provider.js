'use strict';
var firebase = require('firebase');

var config = {
    apiKey: "AIzaSyAuFTR7z6gnq1agVkM0j1mtdUBEthRXUfg",
    authDomain: "hey-bro.firebaseapp.com",
    databaseURL: "https://hey-bro.firebaseio.com",
    storageBucket: "hey-bro.appspot.com",
    serviceAccount: "./app/providers/serviceAccountCredentials.json"
};
firebase.initializeApp(config);

module.exports = {
    getFirebase: function () {
        return firebase.database();
    }
};
