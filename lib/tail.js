/**
 * Created by amills001c on 11/5/15.
 */


var fs = require('fs');
var eventBus = require('../events/eventBus');
var cp = require('child_process');
var spawn = cp.spawn;

var path = require('path');
var appRoot = require('app-root-path');


var filename = path.resolve(path.normalize(appRoot + '/logs/log_file.log'));


var files = {

    "1": path.resolve(path.normalize(appRoot + '/logs/1.log')),
    "2": path.resolve(path.normalize(appRoot + '/logs/2.log')),
    "3": path.resolve(path.normalize(appRoot + '/logs/3.log')),
    "4": path.resolve(path.normalize(appRoot + '/logs/4.log'))

};

var index = 1;

var tail = spawn("tail", ["-f", files[String(index)]]);


tail.stdout.on('data', function (data) {
    eventBus.emit('stdout_data', data);
    getStat();
});

tail.stderr.on('data', function (data) {
    eventBus.emit('stderr_data', data);
});


function getStat() {

    fs.stat(files[String(index)], function (err, stat) {
        if (err) {

        }
        else {
            if (stat.size > 10000) {
                rotate();
            }
        }
    });

}

function rotate() {

    cp.exec("sed '1d' " + files[String(index)], {maxBuffer: 1024 * 50000}, function (err, data, stderr) {
        console.log(err, data, stderr);
    });

}


module.exports = tail;
