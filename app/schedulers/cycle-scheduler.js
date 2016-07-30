'use strict';
var firebase = require('firebase');
var moment = require('moment');

module.exports = {
    run: function (user) {
        var sentAtString = moment().format('YYYY-MM-DD');
        return new Promise(function(resolve, reject) {
            let pendingRefPath = '/notifications/pending/cycle/'+sentAtString+'/'+user.uid;
            let sentRefPath = '/notifications/sent/cycle/'+sentAtString+'/'+user.uid;
            firebase.database().ref(sentRefPath).once('value').then(function (snapshot) {
                if (snapshot.exists()) {
                    // Pending notification already exists
                    reject();
                } else if (user.push_token &&
                    user.cycleDate &&
                    user.cycleNotificationDaysBefore &&
                    (getDaysUntilNextCycle(getNextCycleStartMoment(user.cycleDate)) == user.cycleNotificationDaysBefore)) {
                        var cycleNotification = {
                            type: 'cycle',
                            push_token: user.push_token,
                            title: 'Cycle approaching!',
                            message: 'Your girl\'s cycle is '+getDaysUntilNextCycle(getNextCycleStartMoment(user.cycleDate))+' days away.',
                            sent_at: sentAtString,
                            uid: user.uid,
                            email: user.email
                        }
                        firebase.database().ref(pendingRefPath)
                            .set(cycleNotification)
                            .then(function () {
                                resolve();
                            });
                } else {
                    reject();
                }
            });
        });
    }
};

function getDaysUntilNextCycle (nextCycleMoment) {
    return Math.abs(moment().startOf('day').diff(nextCycleMoment, 'days'));
}

function getNextCycleStartMoment(originalCycleDateString) {
    let cycle = 28;
    let now = moment();
    let originalCycleMoment = moment(originalCycleDateString);
    let nextCycleMoment = originalCycleMoment;
    while (nextCycleMoment.isBefore(now)) {
        nextCycleMoment = nextCycleMoment.add(cycle, 'days');
    }
    return nextCycleMoment.startOf('day');
}
