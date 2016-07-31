// Authenticating on a global basis.
var gcloud = require('gcloud')({
  projectId: 'heybro-push-scheduler',
  keyFilename: './app/providers/serviceAccountCredentials.json'
});


module.exports = {
    debug: debug
};


var logging = gcloud.logging();
var syslog = logging.log('syslog');

// Create a sink using a Bucket as a destination.
// var gcs = gcloud.storage();

// logging.createSink('my-new-sink', {
//   destination: gcs.bucket('my-sink')
// }, function(err, sink) {});

// Write a critical entry to a log.


function debug (msg) {
    var resource = {
      type: 'gce_instance',
      labels: {
        zone: 'global',
        instance_id: '3'
      }
    };
    var entry = syslog.entry(resource, {
      delegate: process.env.user,
      message: msg
    });
    syslog.debug(entry, function(err) {});
}
