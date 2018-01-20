/*

model sin/tan graph to all available data per spot
https://github.com/mljs/levenberg-marquardt#readme

punch condition into model per factor.

check what happens with Direction vars

calculate wind/tide/swell ratings based on min of contributors (energy/speed & direction)

Rating = 0.05*max + 0.15*mid + 0.8*min

*/

const keys = require("../config/keys");
const mongoose = require("mongoose");
const PolynomialRegression = require("ml-regression").PolynomialRegression;

mongoose.connect(keys.mongoURI);

const Sessions = mongoose.model("sessions");

const modelRating = async ( spotID ) => {
	Sessions.find({ _spot: spotID }).exec(async function(err, doc) {
		const ratings = doc.map(s => s.condition.rating / 10);
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

		const windSpeedModel = new PolynomialRegression(windSpeeds, ratings, 2);
		const windDirectionModel = new PolynomialRegression(
			windDirection,
			ratings,
			3
		);
		const swellEnergyModel = new PolynomialRegression(swellEnergy, ratings, 2);
		const swellDirectionModel = new PolynomialRegression(
			swellDirection,
			ratings,
			3
		);
		const tideModel = new PolynomialRegression(tide, ratings, 2);

		const windRating = ( windSpeedModel, windDirectionModel, speed, direction ) => {
			const directionFactor = speed / 30;
			const speedFactor = 1 - directionFactor;
			if (speedFactor > 0) {
				return (
					windSpeedModel.predict(speed) * speedFactor +
					windDirectionModel.predict(direction) * directionFactor
				);
			} else {
				return Math.min(
					windSpeedModel.predict(speed),
					windDirectionModel.predict(direction)
				);
			}
		};

		const swellRating = ( swellEnergyModel, swellDirectionModel, energy, direction, period ) => {
			const unadjusted = Math.min(
				swellEnergyModel.predict(energy),
				swellDirectionModel.predict(direction)
			);
			return unadjusted * period / 16;
		};

		const tideRating = ( tideModel, tide ) => {
			return tideModel.predict(tide);
		};

		const windF = windRating(windSpeedModel, windDirectionModel, 10, 250)>0?windRating(windSpeedModel, windDirectionModel, 10, 250):0;
		const swellF = swellRating(swellEnergyModel, swellDirectionModel, 250, 70, 18)>0?swellRating(swellEnergyModel, swellDirectionModel, 250, 70, 18):0;
		const tideF = tideRating(tideModel, 1.2)>0?tideRating(tideModel, 1.2):0;	

		const rating = 0.8*Math.min( windF, swellF, tideF ) + 0.05*Math.max( windF, swellF, tideF ) + 0.15*[ windF, swellF, tideF ].sort((a,b) => a - b)[2]
		
		return rating

	});
};

module.exports = modelRating;
