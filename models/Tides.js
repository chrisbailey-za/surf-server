const mongoose = require('mongoose');
const { Schema } = mongoose; 

const tideSchema = new Schema ({
	height: Number,
	date: Date,
	dt: Number
});

module.exports = tideSchema;