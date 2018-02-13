const keys = require("../config/keys");
const mongoose = require("mongoose");
require("../models/RatingModel");
require("../models/Rating");
require("../models/Spot");

mongoose.connect(keys.mongoURI);

const RatingModel = mongoose.model("ratingModel")
const Rating = mongoose.model("rating")
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

const quadModel = (coefficents, value) => {
	return coefficents[0] + coefficents[1]*value + coefficents[2]*(value^2);
}

const sinModel = (coefficents, value) => {
	return coefficents[0] * Math.sin(((value/180)*Math.PI) + coefficents[1]) + coefficents[2];
}

const ratingCalculation = (forecast) => {

	Spots.find({ location : forecast[0].location }).exec( async function(err, doc){
		if (err) { console.log(err) }
		doc.forEach((spot) => {

			const user = spot._user;

			RatingModel.findOne({ _spot : spot.id }).exec( async function(err, doc){
				if (err) { console.log(err) }
				
				const windSpeedModel = (input) => {
						return quadModel( doc.models.windSpeedModel, input );
				}

				const windDirectionModel = (input) => {
						return sinModel(doc.models.windDirectionModel, input);
				}

				const swellEnergyModel = (input) => {
						return quadModel( doc.models.swellEnergyModel, input );
				}

				const swellDirectionModel = (input) => {
						return sinModel(doc.models.swellDirectionModel, input);
				}

				const tideModel = (input) => {
						return quadModel( doc.models.tideModel, input );
				}

				var ratingArr = [];

				await forecast.forEach((elem) => {

					const windF = windRating(windSpeedModel, windDirectionModel, elem.windSpeed, elem.windDirection)>0?windRating(windSpeedModel, windDirectionModel, elem.windSpeed, elem.windDirection):0;
					const swellF = swellRating(swellEnergyModel, swellDirectionModel, elem.primarySwellEnergy, elem.primarySwellDirection, elem.primarySwellPeriod)>0?swellRating(swellEnergyModel, swellDirectionModel, elem.primarySwellEnergy, elem.primarySwellDirection, elem.primarySwellPeriod):0;
					const tideF = tideRating(tideModel, elem.tide)>0?tideRating(tideModel, elem.tide):0;	

					const score = 0.8*Math.min( windF, swellF, tideF ) + 0.05*Math.max( windF, swellF, tideF ) + 0.15*[ windF, swellF, tideF ].sort((a,b) => a - b)[1]
					
					ratingArr.push({ score: score, date: elem.dayTime, windScore: windF, swellScore: swellF, tideScore: tideF });

				})

				Rating.findOneAndUpdate({_spot:spot.id, _user:user}, {ratingArr: ratingArr}, {upsert:true}, function(err, doc){
					if (err) return res.send(500, { error: err });
				});

			})
		})
	})

};

module.exports = ratingCalculation;
