var mongoose = require('mongoose');

module.exports = function (req, res, next) {

    //readyState = 1 means that connection was established
    if (mongoose.connection.readyState !== 1) {
        return next(new Error('Database connection is not established. Mongoose readyState: ' + mongoose.connection.readyState));
    }

    next();
};