var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var ClientSchema = new mongoose.Schema({
	clientName 		 : String,
	platform		 : String,
	cluster			 : String,
	ui_version 		 : String,
	brandName		 : String,
	accountName		 : String,
	accountDirector  : String
}, {
    collection: 'clients'
});

ClientSchema.plugin(mongoosePaginate);
const Client = mongoose.model('Client', ClientSchema);

module.exports = Client;