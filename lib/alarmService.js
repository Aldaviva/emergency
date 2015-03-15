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
    console.info("EMERGENCY!");
    rpio.write(pin, rpio.HIGH);
}

function stopAlarm(){
    console.info("OK, emergency over");
    rpio.write(pin, rpio.LOW);
}