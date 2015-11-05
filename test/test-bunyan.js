/**
 * Created by amills001c on 11/5/15.
 */



var path = require('path');
var appRoot = require('app-root-path');

var filepath = path.resolve(path.normalize(appRoot + '/logs/log_file.log'));

var bunyan = require('bunyan');

var logger = bunyan.createLogger({
    name:'alexlogger',
    src:false,
    streams: [
        {
            level: 'info',
            path: filepath
        }
    ]

});



//var logger = new Logger({filepath:filepath});

var int = 0;

//setInterval(function(){
//
//    logger.log('cars'+ int++);
//
//},1000);

console.time('logger');

for(var i= 0; i < 10000; i++){

    logger.info('cars'+ i);

    //console.log('cars'+i);

}

console.timeEnd('logger');