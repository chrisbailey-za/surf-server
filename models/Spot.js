const mongoose = require('mongoose');
const { Schema } = mongoose;

const spotSchema = new Schema ({
	googleID: String

});

mongoose.model('spots', spotSchema);