var mongoose = require('mongoose');
var mongoosastic = require('mongoosastic');
var Schema =  mongoose.Schema;

/* Schema definition */
var ExampleSchema = new Schema({
    eid: String,
    details: {
        status: String
    }
});
/* Add search API through ES */
ExampleSchema.plugin(mongoosastic);

/*
 *  Get details by a given eid
 */
ExampleSchema.statics.getDetailsById = function (eid, cb){
    this.findOne({
        eid: eid
    }, 'details -_id').exec(cb);
};

/*
* Excludes details information when retrieving all transfers
*/
ExampleSchema.statics.getAll = function(cb) {
   this.find({}, '-details').exec(cb);
};

module.exports = mongoose.model('ExampleSchema', ExampleSchema);