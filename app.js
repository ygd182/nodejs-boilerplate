var express = require('express');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var cors = require('cors');
var errorHandler = require('errorhandler');
var config = require('config');
var path = require('path');
var app = express();

var passport        = require('passport'),
    bodyParser      = require('body-parser');


var mongooseConnection = require('./middleware/mongooseConnection');

// get config at start time so that the app blows up as soon as possible
var httpPort = config.get('port');

// =============================================================================
// Express CONFIGURATION
// =============================================================================

//app.set('port', httpPort);
app.set('port', process.env.PORT || httpPort);

// get our request parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
app.use(cors());
app.use(errorHandler());
app.use(express.static(path.join(__dirname, 'public')));

// setup logging
if (process.env.NODE_ENV !== 'test') {
    require('./utils/listEndpoints')('/wells', require('./routes/wells').stack);
    require('./utils/listEndpoints')('/wells', require('./routes/wells').stack);
}

app.use(mongooseConnection);


//===============================================================================
//http://www.codexpedia.com/node-js/node-js-authentication-using-passport-local-strategy/

 
// body-parser for retrieving form data
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
 
// initialize passposrt
app.use(passport.initialize());


var passportConfig  = require('./middleware/passport-config')(passport);
//=================================================================================

app.use('/', require('./routes')(passport));


// =============================================================================
// db CONFIGURATION
// =============================================================================
//console.log(config.mongodb.instances[0].host + '---' + config.mongodb.instances[0].port  );
var dbUrl = 'mongodb://' + config.mongodb.instances[0].host + ':' + config.mongodb.instances[0].port + '/' + config.mongodb.db;
console.log('dbUrl: ' + dbUrl)
app.set('dbUrl', dbUrl);




 

/////////////////////////////////////////////////////////////////////////////////
module.exports = app;

/////////////////////////////////////////////////////////////////////////////////
