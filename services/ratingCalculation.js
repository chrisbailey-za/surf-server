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
const PolynomialRegression = require('ml-regression').PolynomialRegression;

mongoose.connect(keys.mongoURI);

const Sessions = mongoose.model("sessions");

const modelRating = async (spotID) => {

		Sessions.find(
			{ "_spot": spotID }
		).exec(async function(err, doc) {

			var ratings = doc.map(s => s.condition.rating / 10);
			var windSpeeds = doc.map(s => s.condition.windSpeed?s.condition.windSpeed:null);
			var windDirection = doc.map(s => s.condition.windDirection?s.condition.windDirection:null);

			const windSpeedModel = new PolynomialRegression(windSpeeds, ratings, 2);
			const windDirectionModel = new PolynomialRegression(windDirection, ratings, 2);

			const windRating = (windSpeedModel, windDirectionModel, speed, direction) => {
				const directionFactor = speed/30;
				const speedFactor = 1 - directionFactor;
				if(speedFactor>0){
					return windSpeedModel.predict(speed) * speedFactor + windDirectionModel.predict(direction) * directionFactor;
				}else{
					return Math.min(windSpeedModel.predict(speed), windDirectionModel.predict(direction))
				}
			}

		console.log(windRating(windSpeedModel, windDirectionModel, 55, 180))

		})

}

module.exports = modelRating
