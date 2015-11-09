/**
 * Created by amills001c on 11/9/15.
 */


//#fs
var fs = require('fs');

//#redis
var redis = require('redis');
var client = redis.createClient();

//#bunyan
var bunyan = require('bunyan');

var bunyanLogger = bunyan.createLogger({
    name: 'benchmark',
    streams: [
        {
            level: 'info',
            path: '/dev/null'  // log ERROR and above to this file
        }
    ]
});

//#winston
var winston = require('winston');

var winstonLogger = new (winston.Logger)({
    transports: [
        new (winston.transports.File)({ filename: '/dev/null' })
    ]
});

//#syslog
var Syslog = require('node-syslog');
Syslog.init("node-syslog", Syslog.LOG_PID | Syslog.LOG_ODELAY, Syslog.LOG_LOCAL0);


//#this library
var Logger = require('../lib/logger');

var logger = new Logger({
    filepath: '/dev/null',
    useSource: false
});


///////////////////////////////////////////////////////////////////////////////////

console.time('syslog-time');

for (var i = 0; i < 12000; i++) {

    Syslog.log(Syslog.LOG_INFO, "Node Syslog Module output " + new Date())

}

Syslog.close();

console.timeEnd('syslog-time');


///////////////////////////////////////////////////////////////////////////////////


client.on('ready',function(){

    console.time('redis-time');

    for (var i = 0; i < 12000; i++) {

        client.set('key' + i, JSON.stringify('value' + i + 'blah blah blah blah blah extra extra extra'));

    }

    console.timeEnd('redis-time');

});


/////////////////////////////////////////////////////////////////////////////


var wstream = fs.createWriteStream('/dev/null');

wstream.on('open', function(){

    console.time('fs-write-stream-time');

    for (var j = 0; j < 12000; j++) {

        wstream.write(JSON.stringify('key' + j + 'value' + j + 'blah blah blah blah blah extra extra extra') + '\n');

    }

    wstream.end();

    console.timeEnd('fs-write-stream-time');

});


///////////////////////////////////////////////////////////////


console.time('bunyan-time');

for (var k = 0; k < 12000; k++) {

    bunyanLogger.info('bunyan' + k);

}

console.timeEnd('bunyan-time');


/////////////////////////////////////////////////////////////


console.time('winston-time');

for (var m = 0; m < 12000; m++) {

    winstonLogger.info('bunyan' + m);

}

console.timeEnd('winston-time');


/////////////////////////////////////////////////////////////

if(false) {
    console.time('console-time');

    for (var m = 0; m < 12000; m++) {

        console.log(JSON.stringify('console' + m + 'blah blah blah blah blah extra extra extra'));

    }

    console.timeEnd('console-time');
}


/////////////////////////////////////////////////////////////


console.time('logger');

for (var i = 0; i < 12000; i++) {

    logger.info('cars' + i);

    //console.log('cars'+i);

}

console.timeEnd('logger');

//////////////////////////////////////////////////////////////////////