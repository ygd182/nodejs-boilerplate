'use strict';

var map = require('lodash/collection/map');
var pick = require('lodash/object/pick');

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
    WellModel.getAll(function(err, data) {
        if (err) return next(err);

        res.json(data);
        res.end();
    });
};

/**
 *  Get Well details by guid
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

        res.json(data)
    });
};