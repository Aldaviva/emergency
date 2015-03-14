var config = require('../config');
var JobMonitor = require('./JobMonitor');
var EventEmitter = require('events').EventEmitter;

var eventEmitter = module.exports = new EventEmitter();

var isEmergency = false;

var jobMonitors = config.jobs.map(function(jobOpts){
    var jobMonitor = new JobMonitor(jobOpts);
    jobMonitor.on('change:isEmergency', onJobEmergencyChange);
    jobMonitor.startMonitoring();
    return jobMonitor;
});

function onJobEmergencyChange(job){
    var newIsEmergency = jobMonitors.some(function(jobMonitor){
	return jobMonitor.isEmergency;
    });

    if(isEmergency !== newIsEmergency){
	isEmergency = newIsEmergency;
	eventEmitter.emit('change:isEmergency', newIsEmergency);
    }
}
