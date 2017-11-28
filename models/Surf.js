const mongoose = require("mongoose");
const { Schema } = mongoose;
const conditionSchema = require("./Conditions");

const surfSchema = new Schema({
	daytime: Date,
	condition: conditionSchema,
	pesudoCondition: conditionSchema,
	comments: String,
	_spot: { type: Schema.Types.ObjectId, ref: "Spot" },
	_user: { type: Schema.Types.ObjectId, ref: "User" }
});

mongoose.model("surfs", surfSchema);