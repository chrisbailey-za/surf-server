const mongoose = require('mongoose');
const { Schema } = mongoose; 

const conditionSchema = new Schema ({
	rating: Number,
	dayTime: Date,
	swellSize: Number,
	swellDirection: Number,
	swellPeriod: Number,
	swellEnergy: Number,
	windSpeed: Number,
	windDirection: Number,
	tide: Number,
});

module.exports = conditionSchema;