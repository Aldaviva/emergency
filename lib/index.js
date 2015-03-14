var alarmService = require('./alarmService');
var jobService = require('./jobService');

alarmService.stopAlarm();

jobService.on('change:isEmergency', function(isEmergency){
	if(isEmergency){
		alarmService.startAlarm();
	} else {
		alarmService.stopAlarm();
	}
});
