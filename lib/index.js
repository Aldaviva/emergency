//var alarmService = require('./alarmService');
var jobService = require('./jobService');

//alarmService.stopAlarm();

jobService.on('change:isEmergency', function(isEmergency){
	if(isEmergency){
		console.log("EMERGENCY!");
//		alarmService.startAlarm();
	} else {
		console.log("ok, emergency over");
//		alarmService.stopAlarm();
	}
});
