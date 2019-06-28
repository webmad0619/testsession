const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schemaName = new Schema({
	name: String,
	author: String,
	year: Number
});

const Model = mongoose.model('Book', schemaName);
module.exports = Model;