/**
 * Created by amills001c on 11/5/15.
 */


var fs = require('fs');
var os = require('os');


function Logger(opts) {

    opts = opts || {};
    this.useSource = opts.useSource === true;
    this.loggerName = opts.name || 'logging-1';
    this.wstream = fs.createWriteStream(opts.filepath,{encoding:'utf8'});

}


function log(logger, level, msg) {

    var stackTrace = logger.useSource ? new Error().stack.split('\n')[2].split('(')[1] : '';

    var obj = {
        time: Date.now(),
        name: logger.loggerName,
        level: level,
        pid:process.pid,
        hostname:os.hostname(),
        msg: msg,
        stackTrace: stackTrace
    };

    try {
        obj = JSON.stringify(obj);
    }
    catch (err) {
        throw new Error('Could not stringify msg passed to log');
    }

    logger.wstream.write(obj + '\n');
}


Logger.prototype.info = function (msg) {
    log(this, 'info', msg);
};

Logger.prototype.warn = function (msg) {
    log(this, 'warn', warn);
};

Logger.prototype.debug = function (msg) {
    log(this, 'debug', msg);
};

Logger.prototype.trace = function (msg) {
    log(this, 'trace', msg);
};

Logger.prototype.error = function (msg) {
    log(this, 'error', msg);
};

Logger.prototype.fatal = function (msg) {
    log(this, 'fatal', msg);
};


module.exports = Logger;