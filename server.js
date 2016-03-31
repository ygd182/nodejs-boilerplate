var config = require('config');
//var db = require('meta-mongoose');
var db = require('mongoose');
var app = require('./app');
//var log = require('meta-logger')('Server').logger;

// Mongo connection setup
db.connect(config);

// Start Express
var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port);
});
