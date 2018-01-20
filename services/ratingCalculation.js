const keys = require("../config/keys");
const mongoose = require("mongoose");
require("../models/RatingModel");
require("../models/Spot");

mongoose.connect(keys.mongoURI);

const RatingModel = mongoose.model("ratingModel")
const Spots = mongoose.model("spots")

const windRating = ( windSpeedModel, windDirectionModel, speed, direction ) => {
	const directionFactor = speed / 30;
	const speedFactor = 1 - directionFactor;
	if (speedFactor > 0) {
		return (
			windSpeedModel(speed) * speedFactor +
			windDirectionModel(direction) * directionFactor
		);
	} else {
		return Math.min(
			windSpeedModel(speed),
			windDirectionModel(direction)
		);
	}
};

const swellRating = ( swellEnergyModel, swellDirectionModel, energy, direction, period ) => {
	const unadjusted = Math.min(
		swellEnergyModel(energy),
		swellDirectionModel(direction)
	);
	return unadjusted * (period / 16);
};

const tideRating = ( tideModel, tide ) => {
	return tideModel(tide);
};


const ratingCalculation = (forecast) => {

	Spots.find({ location : forecast[0].location }).exec( async function(err, doc){
		if (err) { console.log(err) }
		doc.forEach((spot) => {

			RatingModel.findOne({ _spot : spot.id }).exec( async function(err, doc){
				if (err) { console.log(err) }
				
				const windSpeedModel = (input) => {
						return doc.models.windSpeedModel.coefficients[0] + doc.models.windSpeedModel.coefficients[1]*input + doc.models.windSpeedModel.coefficients[2]*(input^2);
				}

				const windDirectionModel = (input) => {
						return doc.models.windDirectionModel.coefficients[0] + doc.models.windDirectionModel.coefficients[1]*input + doc.models.windDirectionModel.coefficients[2]*(input^2) + doc.models.windDirectionModel.coefficients[3]*(input^3);
				}

				const swellEnergyModel = (input) => {
						return doc.models.swellEnergyModel.coefficients[0] + doc.models.swellEnergyModel.coefficients[1]*input + doc.models.swellEnergyModel.coefficients[2]*(input^2);
				}

				const swellDirectionModel = (input) => {
						return doc.models.swellDirectionModel.coefficients[0] + doc.models.swellDirectionModel.coefficients[1]*input + doc.models.swellDirectionModel.coefficients[2]*(input^2) + doc.models.swellDirectionModel.coefficients[3]*(input^3);
				}

				const tideModel = (input) => {
						return doc.models.tideModel.coefficients[0] + doc.models.tideModel.coefficients[1]*input + doc.models.tideModel.coefficients[2]*(input^2);
				}

				forecast.forEach((elem) => {

					const windF = windRating(windSpeedModel, windDirectionModel, elem.windSpeed, elem.windDirection)>0?windRating(windSpeedModel, windDirectionModel, elem.windSpeed, elem.windDirection):0;
					const swellF = swellRating(swellEnergyModel, swellDirectionModel, elem.primarySwellEnergy, elem.primarySwellDirection, elem.primarySwellPeriod)>0?swellRating(swellEnergyModel, swellDirectionModel, elem.primarySwellEnergy, elem.primarySwellDirection, elem.primarySwellPeriod):0;
					const tideF = tideRating(tideModel, elem.tide)>0?tideRating(tideModel, elem.tide):0;	

					const score = 0.8*Math.min( windF, swellF, tideF ) + 0.05*Math.max( windF, swellF, tideF ) + 0.15*[ windF, swellF, tideF ].sort((a,b) => a - b)[1]
					
					const rating = {score: score, _spot: spot.id, date: elem.dayTime};

					console.log(rating);

				})

			})
		})
	})

};

module.exports = ratingCalculation;
