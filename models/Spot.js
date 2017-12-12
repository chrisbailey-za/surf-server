const mongoose = require("mongoose");
const { Schema } = mongoose;
const conditionSchema = require("./Conditions");

const spotSchema = new Schema({
	spotName: String,
	location: String,
	quality: Number,
	minCondition: conditionSchema,
	maxCondition: conditionSchema,
	_user: { type: Schema.Types.ObjectId, ref: "User" }
});

mongoose.model('spots', spotSchema);
