const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema ({
		googleID: String,
		spots: [{spotId: String, name:String}]
	},
		{ minimize: false }
);

mongoose.model('users', userSchema);