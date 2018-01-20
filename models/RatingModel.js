const mongoose = require('mongoose');
const { Schema } = mongoose; 
const Mixed = mongoose.Schema.Types.Mixed;

const ratingModelShema = new Schema ({
	_spot: { type: Schema.Types.ObjectId, ref: "Spot" },
	models: Mixed
});

mongoose.model('ratingModel', ratingModelShema);
