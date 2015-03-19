var rpio = require('rpio');
var config = require('../config');

var pin = config.gpio.pin;

module.exports = {
    startAlarm: startAlarm,
    stopAlarm: stopAlarm
};

init();

function init(){
    console.log("Connecting to GPIO pin "+pin+"...");
    rpio.setMode('physical');
    rpio.setOutput(pin);
}

function startAlarm(){
    rpio.write(pin, rpio.HIGH);
}

function stopAlarm(){
    rpio.write(pin, rpio.LOW);
}

function shutdown(){
    console.info("stopping alarm...");
    stopAlarm();
    process.exit(0);
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
