var alarmService = require('./alarmService');
var jobService = require('./jobService');

alarmService.stopAlarm();

jobService.on('change:isEmergency', function(isEmergency){
	if(isEmergency){
	    console.info("EMERGENCY!");
		alarmService.startAlarm();
	} else {
	    console.info("OK, emergency over");
		alarmService.stopAlarm();
	}
});
