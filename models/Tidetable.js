const mongoose = require('mongoose');
const { Schema } = mongoose; 
const tideSchema = require("./Tides");

const tidetableSchema = new Schema ({
	tideTable: [tideSchema],
	date: Date
});

mongoose.model("tides", tidetableSchema);
