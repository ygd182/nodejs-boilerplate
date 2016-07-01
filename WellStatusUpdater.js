var WellStatusUpdater = {};
var config = require('config');
var db = require('mongoose');
var app = require('./app');
var moment = require('moment');
var WellModel = require('./models/WellModel');
var maxMinCheck = 40;
var intervalMin = 3;
var intervalTime = 60*intervalMin*1000;

function getHoursAndMinsFromDate(dateTime) {
    var auxDateTime = new moment(dateTime).format('HH:mm');
    return stringTimeToInt(auxDateTime);
}

function stringTimeToInt(stringTime) {
    return _.parseInt(stringTime.replace(/:/g, ''));
}

function updateWell(well) {
	if(well.log) {
		console.log(well.log.checkTime);
		var lastChecktime = moment(well.log.checkTime);
		var actualTime = moment().local();
		console.log(lastChecktime.format());
		console.log(actualTime.format());
		console.log(actualTime.diff(lastChecktime, 'minutes'));
		well.onTime = actualTime.diff(lastChecktime, 'minutes') < maxMinCheck;
		console.log(well.onTime);
	} else {
		well.onTime = false;
	}
	well.save(function (err, data) {
        if (err) 
        	console.log(err);
    });
}


WellStatusUpdater.updateOnTimeField = function updateOnTimeField() {
	WellModel.getAll(function(err, data) {
        if (err)
        	console.log(err);

        for (var i = 0; i < data.length; i++) {
        	//console.log(data[i]);
        	updateWell(data[i]);
        }

    });
}

WellStatusUpdater.startUpdating = function startUpdating() {
	var _this = this;
	setInterval(function() {
	  _this.updateOnTimeField();
	}, intervalTime);
}

module.exports = WellStatusUpdater;