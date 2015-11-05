/**
 * Created by amills001c on 11/5/15.
 */


var eventBus = require('../events/eventBus');
var spawn = require('child_process').spawn;

var path = require('path');
var appRoot = require('app-root-path');


var filename = path.resolve(path.normalize(appRoot + '/logs/log_file.log'));

var tail = spawn("tail", ["-f", filename]);


tail.stdout.on('data', function (data) {
    eventBus.emit('stdout_data',data);
});

tail.stderr.on('data', function (data) {
    eventBus.emit('stderr_data',data);
});


module.exports = tail;
