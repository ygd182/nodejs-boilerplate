var config = require('config');
var db = require('mongoose');
var app = require('./app');


// Mongo connection setup
//db.connect(config);
db.connect(app.get('dbUrl'));

var dbConnection = db.connection; 
dbConnection.on( 'error' , console.error.bind(console, 'connection error:' )); 
dbConnection.once( 'open' , function () { 
	// we're connected! 
	startServer();
});

function startServer() {
	// Start Express
	var server = app.listen(app.get('port'), function() {
	    console.log('Express server listening on port ' + server.address().port);
	    var WellStatusUpdater = require('./WellStatusUpdater');
		WellStatusUpdater.startUpdating();
	});

}
