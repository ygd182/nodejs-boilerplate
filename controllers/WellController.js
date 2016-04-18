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
    var query = {_id: req.params.id};
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
    var query = {_id: req.params.id};
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