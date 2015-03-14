var wiringPi = require('wiring-pi');
var config = require('../config');

var pin = config.gpio.pin;

module.exports = {
    startAlarm: startAlarm,
    stopAlarm: stopAlarm
};

init();

function init(){
    console.log("Connecting to GPIO pin "+pin+"...");
    wiringPi.setup("phys");
    wiringPi.pinMode(pin, wiringPi.OUTPUT);
}

function startAlarm(){
    console.info("EMERGENCY!");
    wiringPi.digitalWrite(pin, 1);
}

function stopAlarm(){
    console.info("OK, emergency over");
    wiringPi.digitalWrite(pin, 0);
}