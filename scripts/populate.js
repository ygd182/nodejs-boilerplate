var fs = require('fs');
var _ = require('lodash');
var config = require('config');
var db = require('mongoose');
var WellModel = require('../models/WellModel');
var app = require('../app');


var i = 0;

// Mongo connection setup
console.log(config);
//var uri = 'mongodb://localhost:27017';
db.connect(app.get('dbUrl'), function(e){
    if(e)
        console.log('error connecting '+e);
    else
        loadData();
});

function loadData(){
    var parsedData = JSON.parse(fs.readFileSync('scripts/mock.json'));
    console.log(parsedData)
_.each(parsedData.response.wells, function (parsed) {

    var example = new WellModel({
        id: parsed.id,
        info: parsed.info,
        logs: parsed.logs,
        enabled: parsed.enabled,
        address: parsed.address,
        rules: parsed.rules
    });

    example.save(function () {
        example.on('es-indexed', function () {

            i++;

            checkDisconnect(i, parsedData);
        });
    });
});
}


function checkDisconnect (i, parsedData) {
    if (i === parsedData.response.wells.length) {
        console.log('Finished saving and indexing mocks documents');
        db.disconnect();
    }
}