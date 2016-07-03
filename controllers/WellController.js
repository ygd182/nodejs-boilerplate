'use strict';

var map = require('lodash/collection/map');
var pick = require('lodash/object/pick');
var _ = require('lodash');
var moment = require('moment');

var WellModel = require('../models/WellModel');


/**
 *  Retrieve all Well documents
 *
 *  @method
 *  @memberOf Wellcontroller
 *  @param {Object} req request object
 *  @param {Object} res response object
 *  @param {Object} next next function
 *  @return {Array} all transfers array
 */
exports.getAll = function getAll(req, res, next) {
    WellModel.getAllDto(function(err, data) {
        if (err) return res.status(400).json({error: err});

        res.json(data);
        res.end();
    });
};

/**
 *  Get Well by id
 *
 *  @method
 *  @memberOf Wellcontroller
 *  @param {Object} req request object
 *  @param {Object} res response object
 *  @param {Object} next next function
 *  @returns {Object} details object
 */
exports.getById = function getById(req, res, next) {
    WellModel.getById(req.params.id, function(err, data){
        if (err) return res.status(400).json({error: err});

        res.json(data);
    });
};

/**
 *  Get Well by id
 *
 *  @method
 *  @memberOf Wellcontroller
 *  @param {Object} req request object
 *  @param {Object} res response object
 *  @param {Object} next next function
 *  @returns {Object} details object
 */
exports.deleteById = function deleteById(req, res, next) {
    var query = {id: req.params.id};
    WellModel.remove(query, function(err, data){
        if (err) return res.status(400).json({error: err});

        res.status(204).json({});
    });
};


/**
 *  Get Well by id
 *
 *  @method
 *  @memberOf Wellcontroller
 *  @param {Object} req request object
 *  @param {Object} res response object
 *  @param {Object} next next function
 *  @returns {Object} details object
 */
exports.updateById = function updateById(req, res, next) {
    var query = {id: req.params.id};
    WellModel.findOneAndUpdate(query, req.body, function(err, activity) {
        if (err) {
            return res.status(400).json({error: err});
        }

        res.json(activity);

    });
};

/**
 *  save Well
 *
 *  @method
 *  @memberOf Wellcontroller
 *  @param {Object} req request object
 *  @param {Object} res response object
 *  @param {Object} next next function
 *  @returns {Object} details object
 */
exports.save = function save(req, res, next) {
    var newWell = new WellModel(req.body);
    newWell.save(function (err, well) {
        if (err) {
            return res.status(404).json({error: err});
        }

        res.json(well);
    });
};

/**
 *  Get Well status by guid and date
 *
 *  @method
 *  @memberOf Wellcontroller
 *  @param {Object} req request object
 *  @param {Object} res response object
 *  @param {Object} next next function
 *  @returns {Object} details object
 */
exports.getStatusByDate = function getStatusByDate(req, res, next) {
    WellModel.getDetailsById(req.params.id, req.params.date, function(err, data){
        if (err) return next(err);

        res.json(data);
    });
};

function getHoursAndMinsFromDate(dateTime) {
    var auxDateTime = new moment(dateTime).format('HH:mm');
    return stringTimeToInt(auxDateTime);
}

function stringTimeToInt(stringTime) {
    return _.parseInt(stringTime.replace(/:/g, ''));
}

function existsRuleByCheckTime(rules, currentCheckTime) {
    var index =_.findIndex(rules, function findByTime(rule) {
        return (stringTimeToInt(rule.start) <= getHoursAndMinsFromDate(currentCheckTime) && stringTimeToInt(rule.end) >= getHoursAndMinsFromDate(currentCheckTime));
    });
    return (-1!==index);
}

function isErrorStatus(rules, active, currentCheckTime) {
    var existActiveRule = existsRuleByCheckTime(rules, currentCheckTime);
    return existActiveRule != active;
}

function isStatusOnTime(well, checkTime) {
    if(well.log) {
        console.log(checkTime);
        var lastChecktime = moment(checkTime);
        var actualTime = moment().local();
        console.log(lastChecktime.format());
        console.log(actualTime.format());
        return actualTime.diff(lastChecktime, 'minutes') < maxMinCheck;
    } else {
        return true;
    }
}
/*
si encontro tiene que ser active
si no encontro tiene que ser non active
*//*
var rules= [
{
end: "07:59",
start: "00:00",
_id: "5747a35822d56c5916954319"
},
{
end: "23:59",
start: "16:00",
_id: "5747a35822d56c5916954318"
}
];


console.log('sin error'+isErrorStatus(rules, true, '2014-01-01T01:18'));
console.log('error'+isErrorStatus(rules, true, '2014-01-01T09:30'));
console.log('sin error'+isErrorStatus(rules, true, '2014-01-01T16:30'));
console.log('error'+isErrorStatus(rules, false, '2014-01-01T17:30'));*/



/**
 *  Get Well by id
 *
 *  @method
 *  @memberOf Wellcontroller
 *  @param {Object} req request object
 *  @param {Object} res response object
 *  @param {Object} next next function
 *  @returns {Object} details object
 */
exports.updateStatusById = function updateStatusById(req, res, next) {
    var query = {id: req.params.id};
    WellModel.findOne(req.params.id, function(err, data){
        if (err) return res.status(400).json({error: err});

        //TODO validations, ontime check
        /* estos valores llegan
        req.body.cause
        req.body.active
        req.body.checkTime*/
        req.body.isError = isErrorStatus(data.rules, JSON.parse(req.body.active), req.body.checktime);
        data.onTime = true;
        data.logs.push(req.body);
        data.log = req.body;
        data.save(function (err, data) {
            if (err) return res.status(400).json({error: err});

            res.json(data);
        });
    });
};