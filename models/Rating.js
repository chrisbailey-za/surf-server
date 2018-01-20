const mongoose = require('mongoose');
const { Schema } = mongoose; 

const ratingShema = new Schema ({
	_spot: { type: Schema.Types.ObjectId, ref: "Spot" },
	score: Number,
	date: Date
});

mongoose.model("rating", ratingShema);
