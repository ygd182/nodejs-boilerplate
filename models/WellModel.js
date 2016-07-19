var mongoose = require('mongoose');
var mongoosastic = require('mongoosastic');
var Schema =  mongoose.Schema;

var StatusSchema = new Schema({ 
	checkTime: String,
    cause: String,
	active: Boolean,
    isError: Boolean
 });

var RulesSchema = new Schema({ 
	start: String,
	end: String/*,
	active: Boolean it is suposed to be on otherwise off*/
 });

/* Schema definition */
var WellSchema = new Schema({
	id: {
        type: String,
        required: true
    },
    enabled: Boolean,
    onTime: Boolean,
    info: String,
    address: {
        x: Number, 
        y: Number,
        street: String,
        number: String
    },
    log: StatusSchema,
    logs: [StatusSchema],
    rules: [RulesSchema]
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
* Excludes logs when retrieving all wells
*/
WellSchema.statics.getAllDto = function(cb) {
   this.find({}, '-_id -__v -logs').sort({ id: 1 }).exec(cb);
};

WellSchema.statics.getAll = function(cb) {
   this.find({}).exec(cb);
};


WellSchema.statics.getById = function (id, cb) {
	this.findOne({
        id: id
    }, '-_id -__v').exec(cb);
};

module.exports = mongoose.model('WellSchema', WellSchema);