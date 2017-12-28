const mongoose = require('mongoose');
const { Schema } = mongoose; 

const forecastHistSchema = new Schema ({
		location: Number,
		dayTime: Number,
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

mongoose.model("forecastHistory", forecastHistSchema);
