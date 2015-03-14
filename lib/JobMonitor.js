var Q = require('q');
var request = require('pr-request2');
var EventEmitter = require('events').EventEmitter;
var config = require('../config');
var util = require('util');

var JobMonitor = module.exports = function(jobOpts){
	EventEmitter.call(this);
	this.opts = jobOpts;

	this.isEmergency = false;
	this.buildStatus = {
		building: null,
		result: null
	};

	this.on('change:isEmergency', (function(isEmergency){
		if(isEmergency){
			this.setEmergencyCooldown();
		} else {
			this.clearEmergencyCooldown();
		}
	}).bind(this));
};

util.inherits(JobMonitor, EventEmitter);

JobMonitor.prototype.setIsEmergency = function(newIsEmergency){
	var oldIsEmergency = this.isEmergency;
	
	if((newIsEmergency !== undefined) && (newIsEmergency !== oldIsEmergency)){
		this.isEmergency = newIsEmergency;
		this.emit('change:isEmergency', newIsEmergency);
	}
};

JobMonitor.prototype.startMonitoring = function(){
	this.checkInterval = setInterval(this.updateStatus.bind(this), config.checkFrequency);
	this.updateStatus();
};

JobMonitor.prototype.fetchStatus = function(){
	//	var statusUrl = this.opts.url + "/lastBuild/api/json"; //FIXME testing
	var statusUrl = this.opts.url;

	return request.get({
		url: statusUrl,
		json: true
	})
		.fail(function(err){
			console.error("Failed to check "+statusUrl, err);
			throw err;
		})
		.then(function(res){
			return {
				building: res.body.building,
				result: res.body.result
			};
		});
};

JobMonitor.prototype.updateStatus = function(){
	this.fetchStatus()
		.then((function(newBuildStatus){
			var oldBuildStatus = this.buildStatus;
			var oldIsEmergency = this.isEmergency;
			var newIsEmergency;

			if(!oldBuildStatus.building && newBuildStatus.building){
				
				//build just started
				console.log("build for "+this.opts.name+" just started, not an emergency");
				newIsEmergency = false;
			
			} else if(oldBuildStatus.building && !newBuildStatus.building){
				
				//build just stopped
				newIsEmergency = (["FAILURE", "UNSTABLE"].indexOf(newBuildStatus.result) !== -1);
				if(newIsEmergency){
					console.log("build for "+this.opts.name+" stopped with failure/unstable, this is an emergency!");
				} else {
					console.log("build for "+this.opts.name+" stopped with success or aborted, not an emergency");
				}
			}
			
			this.buildStatus = newBuildStatus;
			this.setIsEmergency(newIsEmergency);
			
		}).bind(this))
		.fail((function(err){
			console.error("error while updating status for "+this.opts.name+", setting isEmergency = false", err);
			this.setIsEmergency(false);
		}).bind(this));
};

JobMonitor.prototype.setEmergencyCooldown = function(){
	this.clearEmergencyCooldown();
	this._emergencyCooldown = setTimeout((function(){
		this.setIsEmergency(false);
	}).bind(this), config.cooldownTimeout);
};

JobMonitor.prototype.clearEmergencyCooldown = function(){
	this._emergencyCooldown && clearTimeout(this._emergencyCooldown);
	this._emergencyCooldown = null;
};
