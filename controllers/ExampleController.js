'use strict';

var map = require('lodash/collection/map');
var pick = require('lodash/object/pick');

var ExampleModel = require('../models/ExampleModel');


/**
 *  Retrieve all transfers documents
 *
 *  @method
 *  @memberOf ExampleController
 *  @param {Object} req request object
 *  @param {Object} res response object
 *  @param {Object} next next function
 *  @return {Array} all transfers array
 */
exports.getAll = function getAll(req, res, next) {
    ExampleModel.getAll(function(err, data) {
        if (err) return next(err);

        res.json(data);
        res.end();
    });
};

/**
 *  Get transfer details by guid
 *
 *  @method
 *  @memberOf ExampleController
 *  @param {Object} req request object
 *  @param {Object} res response object
 *  @param {Object} next next function
 *  @returns {Object} details object
 */
exports.getDetailsById = function getDetailsById(req, res, next) {
    ExampleModel.getDetailsById(req.params.guid, function(err, data){
        if (err) return next(err);

        res.json(data)
    });
};