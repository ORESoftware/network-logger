/**
 * Created by amills001c on 11/5/15.
 */


var redis = require('redis');

var subClient = redis.createClient();

subClient.on('message', function(channel,data){

    if(channel === 'channel1'){
        console.log('redis sub received message:',channel,data);
    }
    else if(channel === 'channel2'){
        console.log('redis sub received message:',channel,data);
    }
    else{
        throw new Error('redis message received on unexpected channel');
    }

});

subClient.on('connect',function(){
    console.log('sub is connected');
    subClient.subscribe('channel1');
    subClient.subscribe('channel2');
});


module.exports = subClient;