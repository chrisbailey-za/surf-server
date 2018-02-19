const keys = require("../config/keys");
const mongoose = require("mongoose");
const PolynomialRegression = require("ml-regression").PolynomialRegression;
const MLRegression = require("ml-levenberg-marquardt")
require("../models/RatingModel");

mongoose.connect(keys.mongoURI);
require('../models/Session');

const RatingModel = mongoose.model("ratingModel");
const Sessions = mongoose.model("sessions");

const modelCreation = async ( spotID ) => {

	Sessions.find({ _spot: spotID }).exec(async function(err, doc) {
		const ratings = doc.map(s => s.condition.rating);
		const windSpeeds = doc.map(
			s => (s.condition.windSpeed ? s.condition.windSpeed : null)
		);
		const windDirection = doc.map(
			s => (s.condition.windDirection ? s.condition.windDirection : null)
		);
		const swellEnergy = doc.map(
			s => (s.condition.swellEnergy ? s.condition.swellEnergy : null)
		);
		const swellDirection = doc.map(
			s => (s.condition.swellDirection ? s.condition.swellDirection : null)
		);
		const tide = doc.map(s => (s.condition.tide ? s.condition.tide : null));

		const sinFunction = ([a, b, c]) => { return (t) => a * Math.sin(((t/180)*Math.PI) + b) + c }
		const options = {
		  damping: 1.5,
		  initialValues: [5,0,5],
		  gradientDifference: 10e-2,
		  maxIterations: 20,
		  errorTolerance: 10e-3
		};

		const windSpeedModel = new PolynomialRegression(windSpeeds, ratings, 2);
		let windDirectionModel = MLRegression({x:windDirection, y:ratings}, sinFunction, options);
		const swellEnergyModel = new PolynomialRegression(swellEnergy, ratings, 2);
		const swellDirectionModel = MLRegression({x:swellDirection, y:ratings}, sinFunction, options);

		const tideModel = new PolynomialRegression(tide, ratings, 2);

		const modelsArray = {
			windSpeedModel: windSpeedModel.coefficients,
			windDirectionModel: windDirectionModel.parameterValues,
			swellEnergyModel: swellEnergyModel.coefficients,
			swellDirectionModel: swellDirectionModel.parameterValues,
			tideModel: tideModel.coefficients
		}

		RatingModel.findOneAndUpdate({ _spot: spotID }, { models: modelsArray }, {upsert:true}, function(err, doc){
			if (err){
				console.log(err) 
				return res.send(500, { error: err })
			};
		});

	});
};

module.exports = modelCreation;