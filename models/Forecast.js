const mongoose = require('mongoose');
const { Schema } = mongoose; 

const forecastSchema = new Schema ({
	localTimestamp: Number,
	dayTime: Date,
	primarySwellSize: Number,
	primarySwellDirection: Number,
	primarySwellPeriod: Number,
	primarySwellEnergy: Number,
	secondarySwellSize: Number,
	secondarySwellDirection: Number,
	secondarySwellPeriod: Number,
	secondarySwellEnergy: Number,
	windSpeed: Number,
	windDirection: Number,
	tide: Number
});

module.exports = forecastSchema;

//https://www.wunderground.com/weather/api/d/docs?d=data/rawtide for tides