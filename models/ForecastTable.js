const mongoose = require('mongoose');
const { Schema } = mongoose; 
const forecastSchema = require("./Forecast");

const forecasttableSchema = new Schema ({
	forecastTable: [forecastSchema],
	date: Date
});

mongoose.model("forecast", forecasttableSchema);
