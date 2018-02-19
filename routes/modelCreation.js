const keys = require("../config/keys");
const mongoose = require("mongoose");
const PolynomialRegression = require("ml-regression").PolynomialRegression;
require("../models/RatingModel");
const requireLogin = require('../middlewares/requireLogin');
const RatingModel = mongoose.model("ratingModel")
const Sessions = mongoose.model("sessions");
const createRatingModel = require("../services/modelCreation");

module.exports = app => {

	app.post('/api/ratingmodel/update', async (req, res) => {
		const spotID = req.body.spotID;
		createRatingModel(spotID)

		res.send({spotID:spotID})
	});
};
