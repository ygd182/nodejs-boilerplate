var mongoose = require('mongoose');
var mongoosastic = require('mongoosastic');
var Schema =  mongoose.Schema;

var StatusSchema = new Schema({ 
	checkTime: 'Date',
	active: 'Boolean',
	onTime: 'Boolean'
 });

var RulesSchema = new Schema({ 
	start: 'Date',
	end: 'Date',
	repeat: 'Number',
	active: 'Boolean',
	onTime: 'Boolean'
 });

/* Schema definition */
var WellSchema = new Schema({
	id: {
        type: String,
        required: true
    },
    info: String,
    logs: [StatusSchema]
});
/* Add search API through ES */
WellSchema.plugin(mongoosastic);

/*
 *  Get details by a given eid
 */
WellSchema.statics.getStatusByDate = function (id, date, cb) {
    this.findOne({
        id: id
    }, '-_id').exec(cb);
};

/*
* Excludes details information when retrieving all transfers
*/
WellSchema.statics.getAll = function(cb) {
   this.find({}, '-_id -__v').exec(cb);
};

WellSchema.statics.getById = function (id, cb) {
	this.findOne({
        id: id
    }, '-_id -__v').exec(cb);
};

module.exports = mongoose.model('WellSchema', WellSchema);