/**
 * Created by amills001c on 11/3/15.
 */


var eventBus = require('../events/eventBus');

var redis = require('redis');

var pubClient = redis.createClient();

eventBus.on('stdout_data', function(data){
    pubClient.publish('channel1',data);
});

eventBus.on('stderr_data', function(data){
    pubClient.publish('channel2',data);
});


module.exports = pubClient;