var mongoose = require('mongoose');
var mongoosastic = require('mongoosastic');
var Schema =  mongoose.Schema;

var logSchema = new Schema({ 
	start: 'Date',
	end: 'Date',
	active: 'Boolean',
	onTime: 'Boolean'
 });

/* Schema definition */
var WellSchema = new Schema({
    id: String,
    info: String,
    history: [logSchema]
});
/* Add search API through ES */
WellSchema.plugin(mongoosastic);

/*
 *  Get details by a given eid
 */
WellSchema.statics.getDetailsById = function (eid, cb){
    this.findOne({
        eid: eid
    }, 'details -_id').exec(cb);
};

/*
* Excludes details information when retrieving all transfers
*/
WellSchema.statics.getAll = function(cb) {
   this.find({}, '-details').exec(cb);
};

module.exports = mongoose.model('WellSchema', WellSchema);