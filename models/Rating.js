const mongoose = require('mongoose');
const Mixed = mongoose.Schema.Types.Mixed;
const { Schema } = mongoose; 

const ratingShema = new Schema ({
	_spot: { type: Schema.Types.ObjectId, ref: "Spot" },
	_user: { type: Schema.Types.ObjectId, ref: "User" },
	ratingArr: Mixed
})

mongoose.model("rating", ratingShema);
