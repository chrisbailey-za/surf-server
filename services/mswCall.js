const keys = require("../config/keys");
var Msw = require("magicseaweed")([keys.mswKey]);
const mongoose = require("mongoose");
require("../models/Forecasttable");
require("../models/ForecastHist");
require("../models/Tidetable");

const Forecast = mongoose.model("forecasts");
const ForecastHistory = mongoose.model("forecastHistory");
const Tide = mongoose.model("tides");

const kom = {};

kom.msw = {
	spot_id: 848,
	units: "eu",
	fields: ["localTimestamp", "swell.*", "wind.*"]
};
const muiz = {
	spot_id: 848,
	units: "eu",
	fields: ["localTimestamp", "swell.*", "wind.*"]
};
const elands = {
	spot_id: 848,
	units: "eu",
	fields: ["localTimestamp", "swell.*", "wind.*"]
};
const klein = {
	spot_id: 848,
	units: "eu",
	fields: ["localTimestamp", "swell.*", "wind.*"]
};

const mswCall = async () => {
	const condition = await Msw.forecast(kom.msw, (err, forecast) => {
		transferObject(forecast, );
	});

	//condition.location = 848;
	//condition.primarySwellEnergy = condition.primarySwellSize * condition.primarySwellSize * condition.primarySwellPeriod;
	//condition.secondarySwellEnergy = condition.secondarySwellSize * condition.secondarySwellSize * condition.secondarySwellPeriod;
};

const transferObject = data => {
	var forecast = data.map(elem => {
		return {
			dayTime: elem.localTimestamp,
			location: kom.msw.spot_id,
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

	function epochTime(base, x){
		return base + (x * 3600);
	}

	function secondaryCheck(min, max, first, second){
		if(min && max){
			return min * first + max * second;
		}else if(min && !max){
			return min;
		}else if(!min && max){
			return max;
		}else{
			return null;
		}
	};

	let newArr = Array.from(Array(118), (_,x) => x);

	for(hour in newArr){
		if(((hour + 1) % 3) === 0){
			const time = epochTime(forecast[0].dayTime, hour);
			var min = forecast.find(x => { return x.dayTime == time - 7200});
			var max = forecast.find(x => { return x.dayTime == time + 3600});

			const newForecast = {
				dayTime: time,
				location: min.location,
				primarySwellSize: min.primarySwellSize * 0.7 + max.primarySwellSize * 0.3,
				primarySwellDirection: min.primarySwellDirection * 0.7 + max.primarySwellDirection * 0.3,
				primarySwellPeriod: min.primarySwellPeriod * 0.7 + max.primarySwellPeriod * 0.3,
				primarySwellEnergy: min.primarySwellEnergy * 0.7 + max.primarySwellEnergy * 0.3,
				secondarySwellSize: secondaryCheck(min.secondarySwellSize, max.secondarySwellSize, 0.7, 0.3),
				secondarySwellDirection: secondaryCheck(min.secondarySwellDirection, max.secondarySwellDirection, 0.7, 0.3),
				secondarySwellPeriod: secondaryCheck(min.secondarySwellPeriod, max.secondarySwellPeriod, 0.7, 0.3),
				secondarySwellEnergy: secondaryCheck(min.secondarySwellEnergy, max.secondarySwellEnergy, 0.7, 0.3),			
				windSpeed: min.windSpeed * 0.7 + max.windSpeed * 0.3,
				windDirection: min.windDirection * 0.7 + max.windDirection * 0.3
			}
			
			forecast.push(newForecast);

		}else if(((hour + 2) % 3) === 0){
			const time = epochTime(forecast[0].dayTime, hour);
			var min = forecast.find(x => { return x.dayTime == time - 3600});
			var max = forecast.find(x => { return x.dayTime == time + 7200});

			const newForecast = {
				dayTime: time,
				location: min.location,
				primarySwellSize: min.primarySwellSize * 0.3 + max.primarySwellSize * 0.7,
				primarySwellDirection: min.primarySwellDirection * 0.3 + max.primarySwellDirection * 0.7,
				primarySwellPeriod: min.primarySwellPeriod * 0.3 + max.primarySwellPeriod * 0.7,
				primarySwellEnergy: min.primarySwellEnergy * 0.3 + max.primarySwellEnergy * 0.7,
				secondarySwellSize: secondaryCheck(min.secondarySwellSize, max.secondarySwellSize, 0.3, 0.7),
				secondarySwellDirection: secondaryCheck(min.secondarySwellDirection, max.secondarySwellDirection, 0.3, 0.7),
				secondarySwellPeriod: secondaryCheck(min.secondarySwellPeriod, max.secondarySwellPeriod, 0.3, 0.7),
				secondarySwellEnergy: secondaryCheck(min.secondarySwellEnergy, max.secondarySwellEnergy, 0.3, 0.7),			
				windSpeed: min.windSpeed * 0.3 + max.windSpeed * 0.7,
				windDirection: min.windDirection * 0.3 + max.windDirection * 0.7
			}

			forecast.push(newForecast);
		
		}
	};

	addTide(forecast);
};

function addTide(condition) {
	var date = new Date();
	date = Math.round(date.getTime() / 3600000) * 3600;
	//const further = condition.map( async (elem) => {
	var conditionArr = condition;
	var resultData = [];

	Tide.findOne({ "tideTable.dt": date }, { tideTable: 1 }).exec(async function(
		err,
		doc
	) {
		try {
			const tideArr = doc.tideTable.map(tide => {
				return { [tide.dt]: tide.height };
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
				{ "forecastTable.dayTime": date },
				"forecastTable.$.dayTime"
			).exec(async function(err, doc) {
				try {
					 const lastForecast = await doc.forecastTable[0];
					 const history = await new ForecastHistory({
					  			location: lastForecast.lcation,
									dayTime: lastForecast.dayTime,
									location: lastForecast.location,
									primarySwellSize: lastForecast.primarySwellSize,
									primarySwellDirection: lastForecast.primarySwellDirection,
									primarySwellPeriod: lastForecast.primarySwellPeriod,
									primarySwellEnergy: Math.round(lastForecast.primarySwellEnergy*10)/10,
									secondarySwellSize: lastForecast.secondarySwellSize,
									secondarySwellDirection: lastForecast.secondarySwellDirection,
									secondarySwellPeriod: lastForecast.secondarySwellPeriod,
									secondarySwellEnergy: Math.round(lastForecast.primarySwellEnergy*10)/10,
									windSpeed: lastForecast.windSpeed,
									windDirection: lastForecast.windDirection,
									tide: lastForecast.tide
					  });
					history.save();
					
					doc.remove();

				} catch (err) {
					console.log("no history found");
				}
			});

			const forecast = await new Forecast({
				forecastTable: resultData,
				date: resultData[0].localTimestamp
			});
			forecast.save();

		} catch (err) {
			console.log("noope");
		}
	});
}

module.exports = mswCall;

//https://www.wunderground.com/weather/api/d/docs?d=data/rawtide for tides
