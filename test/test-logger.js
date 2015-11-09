/**
 * Created by amills001c on 11/3/15.
 */



var Logger = require('../lib/logger');
var path = require('path');
var appRoot = require('app-root-path');

var filepath = path.resolve(path.normalize(appRoot + '/logs/1.log'));

var logger = new Logger({
    filepath: filepath,
    useSource: false
});


console.time('logger');

for (var i = 0; i < 10000; i++) {

    logger.info('cars' + i);

    //console.log('cars'+i);

}

console.timeEnd('logger');