var alarmService = require('./lib/alarmService');

alarmService.startAlarm();

console.log("Press Ctrl+C to turn off the alarm.");

setInterval(function(){}, 999999); //don't exit