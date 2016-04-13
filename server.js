var config = require('config');
var db = require('mongoose');
var app = require('./app');


// Mongo connection setup
//db.connect(config);
var uri = 'mongodb://localhost:27017';
db.connect(uri);

// Start Express
var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port);
});
