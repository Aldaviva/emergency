var rpio = require('rpio');
var config = require('../config');

var pin = config.gpio.pin;

module.exports = {
	startAlarm: startAlarm,
	stopAlarm: stopAlarm
};

init();

function init(){
	rpio.setMode('physical');
	rpio.setOutput(pin);
}

function startAlarm(){
	console.info("EMERGENCY!");
	rpio.write(pin, rpio.HIGH);
}

function stopAlarm(){
	console.info("ok, emergency over");
	rpio.write(pin, rpio.LOW);
}
