'use strict';
var FirebaseProvider = require('../providers/firebase-provider');
var CycleScheduler = require('./cycle-scheduler');


module.exports = {
    run: run
}

function run () {
    var fdb = FirebaseProvider.getFirebase();
    var promises = [];
    var usersRef = fdb.ref('users');
    return usersRef.once('value', function(snapshot) {
        snapshot.forEach(function(userSnapshot) {
            var user = userSnapshot.val();
            console.log('   - Running schedulers for', user.email);
            promises.push(CycleScheduler.run(user));
            // Add other schedulers here as needed
        });
    });
    // return Promise.all(promises);
}
