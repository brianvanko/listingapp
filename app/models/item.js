var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemSchema = new Schema({
	name: String,
	title: String,
	description: String,
	link: String,
	thumb: String,
	image: String,
	categories: String,
	price: Number
});

module.exports = mongoose.model('Item', ItemSchema);