const keys = require("../config/keys");
var Msw = require("magicseaweed")([keys.mswKey]);
const mongoose = require("mongoose");
const ratingCalculation = require('./ratingCalculation')
require("../models/ForecastTable");
require("../models/ForecastHist");
require("../models/Tidetable");

mongoose.connect(keys.mongoURI);

const Forecast = mongoose.model("forecast");
const ForecastHistory = mongoose.model("forecastHistory");
const Tide = mongoose.model("tides");

const spots = [
	{
		name: "kommetjie",
		msw: {
			spot_id: 848,
			units: "eu",
			fields: ["localTimestamp", "swell.*", "wind.*"]
		}
	},
	{
		name: "muizenberg",
		msw: {
			spot_id: 847,
			units: "eu",
			fields: ["localTimestamp", "swell.*", "wind.*"]
		}
	},
	{
		name: "elands",
		msw: {
			spot_id: 227,
			units: "eu",
			fields: ["localTimestamp", "swell.*", "wind.*"]
		}
	},
	{
		name: "kleinmond",
		msw: {
			spot_id: 1284,
			units: "eu",
			fields: ["localTimestamp", "swell.*", "wind.*"]
		}
	}
];

var mswCall = async () => {
	spots.forEach(spot => {
		var grabFromMSW = async () => {
			var condition = await Msw.forecast(spot.msw, (err, forecast) => {
				transferObject(forecast, spot.msw.spot_id);
			});
		};

		grabFromMSW();

		const transferObject = (data, spotID) => {
			var forecast = data.map(elem => {
				return {
					dayTime: elem.localTimestamp,
					location: spotID,
					primarySwellSize: elem.swell.components.primary.height,
					primarySwellDirection: elem.swell.components.primary.direction,
					primarySwellPeriod: elem.swell.components.primary.period,
					primarySwellEnergy:
						elem.swell.components.primary.height *
						elem.swell.components.primary.height *
						elem.swell.components.primary.period,
					secondarySwellSize: elem.swell.components.secondary
						? elem.swell.components.secondary.height
						: null,
					secondarySwellDirection: elem.swell.components.secondary
						? elem.swell.components.secondary.direction
						: null,
					secondarySwellPeriod: elem.swell.components.secondary
						? elem.swell.components.secondary.period
						: null,
					secondarySwellEnergy: elem.swell.components.secondary
						? elem.swell.components.secondary.height *
							elem.swell.components.secondary.height *
							elem.swell.components.secondary.period
						: null,
					windSpeed: elem.wind.speed,
					windDirection: elem.wind.direction
				};
			});

			function epochTime(base, x) {
				return base + x * 3600;
			}

			function secondaryCheck(min, max, first, second) {
				if (min && max) {
					return min * first + max * second;
				} else if (min && !max) {
					return min;
				} else if (!min && max) {
					return max;
				} else {
					return null;
				}
			}

			function directionCheck(min, max, first, second){
				if(min - max > 180 || min - max < -180){
					var deg = 0
					if(min >180){
						deg = (min - 360) * first + max * second;
						if(deg < 0){
							deg = deg + 360;
						}
						return deg
					}else if(max >180){
						deg = min * first + (max - 360)* second;
						if(deg < 0){
							deg = deg + 360;
						}
						return deg
					}
				}
				return min * first + max * second;
			}

			function secondaryDirectionCheck(min, max, first, second){
				if (min && max) {
					if(min === 0 || max === 0){
						if(min === 0 && max !== 0){
							if(max < 180){
								return min * first + max * second;
							}else{
								return 360 * first + max * second;
							};
						}else if(min === 0 && max !== 0){
							if(min < 180){
								return min * first + max * second;
							}else{
								return min * first + 360 * second;
							};
						}
					}
					return min * first + max * second;
				}else if (min && !max) {
					return min;
				} else if (!min && max) {
					return max;
				} else {
					return null;
				}
			}

			let newArr = Array.from(Array(118), (_, x) => x);

			newArr.forEach(hour => {
				if ((hour + 1) % 3 === 0) {
					const time = epochTime(forecast[0].dayTime, hour);
					var min = forecast.find(x => {
						return x.dayTime == time - 7200;
					});
					var max = forecast.find(x => {
						return x.dayTime == time + 3600;
					});

					const newForecast = {
						dayTime: time,
						location: min.location,
						primarySwellSize:
							min.primarySwellSize * 0.7 + max.primarySwellSize * 0.3,
						primarySwellDirection:
							directionCheck(min.primarySwellDirection, max.primarySwellDirection, 0.7, 0.3),
						primarySwellPeriod:
							min.primarySwellPeriod * 0.7 + max.primarySwellPeriod * 0.3,
						primarySwellEnergy:
							min.primarySwellEnergy * 0.7 + max.primarySwellEnergy * 0.3,
						secondarySwellSize: secondaryCheck(
							min.secondarySwellSize,
							max.secondarySwellSize,
							0.7,
							0.3
						),
						secondarySwellDirection: secondaryDirectionCheck(
							min.secondarySwellDirection,
							max.secondarySwellDirection,
							0.7,
							0.3
						),
						secondarySwellPeriod: secondaryCheck(
							min.secondarySwellPeriod,
							max.secondarySwellPeriod,
							0.7,
							0.3
						),
						secondarySwellEnergy: secondaryCheck(
							min.secondarySwellEnergy,
							max.secondarySwellEnergy,
							0.7,
							0.3
						),
						windSpeed: min.windSpeed * 0.7 + max.windSpeed * 0.3,
						windDirection: directionCheck(min.windDirection, max.windDirection, 0.7, 0.3)
					};

					forecast.push(newForecast);
				} else if ((hour + 2) % 3 === 0) {
					const time = epochTime(forecast[0].dayTime, hour);
					var min = forecast.find(x => {
						return x.dayTime == time - 3600;
					});
					var max = forecast.find(x => {
						return x.dayTime == time + 7200;
					});

					const newForecast = {
						dayTime: time,
						location: min.location,
						primarySwellSize:
							min.primarySwellSize * 0.3 + max.primarySwellSize * 0.7,
						primarySwellDirection:
							directionCheck(min.primarySwellDirection, max.primarySwellDirection, 0.3, 0.7),
						primarySwellPeriod:
							min.primarySwellPeriod * 0.3 + max.primarySwellPeriod * 0.7,
						primarySwellEnergy:
							min.primarySwellEnergy * 0.3 + max.primarySwellEnergy * 0.7,
						secondarySwellSize: secondaryCheck(
							min.secondarySwellSize,
							max.secondarySwellSize,
							0.3,
							0.7
						),
						secondarySwellDirection: secondaryDirectionCheck(
							min.secondarySwellDirection,
							max.secondarySwellDirection,
							0.3,
							0.7
						),
						secondarySwellPeriod: secondaryCheck(
							min.secondarySwellPeriod,
							max.secondarySwellPeriod,
							0.3,
							0.7
						),
						secondarySwellEnergy: secondaryCheck(
							min.secondarySwellEnergy,
							max.secondarySwellEnergy,
							0.3,
							0.7
						),
						windSpeed: min.windSpeed * 0.3 + max.windSpeed * 0.7,
						windDirection: directionCheck(min.windDirection, max.windDirection, 0.3, 0.7)
					};

					forecast.push(newForecast);
				}
			})

			//sort forecast to allow for proper use

			function compare(a,b) {
			  if (a.dayTime < b.dayTime)
			     return -1;
			  if (a.dayTime > b.dayTime)
			    return 1;
			  return 0;
			}

			forecast.sort(compare);

			addTide(forecast);
		};
	});

	function addTide(condition) {
		var date = new Date();
		date = Math.round(date.getTime() / 3600000) * 3600;

		var conditionArr = condition;
		var resultData = [];

		Tide.findOne(
			{ "tideTable.dt": date },
			{ tideTable: 1 }
		).exec(async function(err, doc) {

			try {
				const tideArr = doc.tideTable.map(tide => {
					return { [tide.dt]: tide.height + 0.18 };
				});

				var resultObject = tideArr.reduce(function(result, currentObject) {
					for (var key in currentObject) {
						if (currentObject.hasOwnProperty(key)) {
							result[key] = currentObject[key];
						}
					}
					return result;
				}, {});

				for (tf in conditionArr) {
					var withTide = conditionArr[tf];
					withTide.tide = resultObject[withTide.dayTime];
					resultData.push(withTide);
				}
				

				Forecast.findOne(
					{ 'forecastTable.dayTime': date, 'forecastTable.location': condition[0].location},
					{forecastTable:{$elemMatch:{dayTime: {$eq: date}}}}
				).exec(async function(err, doc) {
					try {

						const lastForecast = await doc.forecastTable[0];
						const history = await new ForecastHistory({
							dayTime: lastForecast.dayTime,
							location: lastForecast.location,
							primarySwellSize: lastForecast.primarySwellSize,
							primarySwellDirection: lastForecast.primarySwellDirection,
							primarySwellPeriod: lastForecast.primarySwellPeriod,
							primarySwellEnergy: lastForecast.primarySwellEnergy,
							secondarySwellSize: lastForecast.secondarySwellSize,
							secondarySwellDirection: lastForecast.secondarySwellDirection,
							secondarySwellPeriod: lastForecast.secondarySwellPeriod,
							secondarySwellEnergy: lastForecast.secondarySwellEnergy,
							windSpeed: lastForecast.windSpeed,
							windDirection: lastForecast.windDirection,
							tide: lastForecast.tide
						});
						history.save();
						doc.remove();
						console.log('updated conditions')
					} catch (err) {
						console.log("no history found");
					}
				});

				ForecastHistory.remove({dayTime: { $lte: date - 1200000 }})

				const forecast = await new Forecast({
					forecastTable: resultData,
					date: resultData[0].localTimestamp
				});
				forecast.save();
				ratingCalculation(resultData);

			} catch (err) {
				console.log(err);
				console.log("noope");
			}
		});

	}
};

module.exports = mswCall;