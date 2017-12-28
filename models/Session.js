const mongoose = require("mongoose");
const { Schema } = mongoose;
const conditionSchema = require("./Conditions");

const sessionSchema = new Schema({
	daytime: Date,
	condition: conditionSchema,
	pseudo: Boolean,
	comments: String,
	_spot: { type: Schema.Types.ObjectId, ref: "Spot" },
	_user: { type: Schema.Types.ObjectId, ref: "User" }
});

mongoose.model('sessions', sessionSchema);