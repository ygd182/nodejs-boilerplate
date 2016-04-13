var fs = require('fs');
var _ = require('lodash');
var config = require('config');
var db = require('mongoose');
var ExampleModel = require('../models/ExampleModel');


var i = 0;

// Mongo connection setup
console.log(config);
var uri = 'mongodb://localhost:27017';
db.connect(uri, function(e){
    if(e)
        console.log('error connecting '+e);
    else
        loadData();
});

function loadData(){
    var parsedData = JSON.parse(fs.readFileSync('scripts/mock.json'));
    console.log(parsedData)
_.each(parsedData.response.examples, function (parsed) {

    var example = new ExampleModel({
        eid: parsed.eid,
        details: {
            status: parsed.status
        }
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
    if (i === parsedData.response.examples.length) {
        console.log('Finished saving and indexing mocks documents');
        db.disconnect();
    }
}