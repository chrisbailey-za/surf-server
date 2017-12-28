import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () => async dispatch => {
	const res = await axios.get('/api/current_user');

	dispatch({ type: FETCH_USER, payload: res.data });
};

export const saveSpot = (values, history) => async dispatch => {

	const newValues = {
	 	spotName: values.spotName,
	 	quality: values.quality,
	 	minCondition: {
			rating: null,
			dayTime: null,
			swellSize: values.swellSize[0],
			swellDirection: values.swellDir,
			swellPeriod: 14,
			swellEnergy: null,
			windSpeed: values.windSpeed[0],
			windDirection: values.windDir,
			tide: values.tide[0]
	 	},
		maxCondition: {
			rating: null,
			dayTime: null,
			swellSize: values.swellSize[1],
			swellDirection: values.swellDir,
			swellPeriod: 14,
			swellEnergy: null,
			windSpeed: values.windSpeed[1],
			windDirection: values.windDir,
			tide: values.tide[1]
		},
		location: values.location
	};

	const res = await axios.post('/api/spots/add', newValues);

		const pseudoMin = {
		daytime: null,
		condition: {
			rating: 75,
			swellSize: values.swellSize[0],
			swellDirection: values.swellDir,
			swellPeriod: 14,
			swellEnergy: values.swellSize[0]*values.swellSize[0]*14,
			windSpeed: values.windSpeed[0],
			windDirection: values.windDir - 30,
			tide: values.tide[0]
	 	},
		pseudo: true,
		comments: null,
		spot: res.data.id
	};

	const pseudoMax = {
		daytime: null,
		condition: {
			rating: 75,
			swellSize: values.swellSize[1],
			swellDirection: values.swellDir,
			swellPeriod: 14,
			swellEnergy: values.swellSize[1]*values.swellSize[1]*14,
			windSpeed: values.windSpeed[1],
			windDirection: values.windDir + 30,
			tide: values.tide[1]
		},
		pseudo: true,
		comments: null,
		spot: res.data.id
	};

	const pseudoPerfect = {
		daytime: null,
		condition: {
			rating: 100,
			swellSize: (values.swellSize[0]+values.swellSize[1])/2,
			swellDirection: values.swellDir,
			swellPeriod: 18,
			swellEnergy: ((values.swellSize[0]+values.swellSize[1])/2)*((values.swellSize[0]+values.swellSize[1])/2)*14,
			windSpeed: (values.windSpeed[0]+values.windSpeed[1])/2,
			windDirection: values.windDir,
			tide: (values.tide[0]+values.tide[1])/2
		},
		pseudo: true,
		comments: null,
		spot: res.data.id
	}

	axios.post('/api/sessions/add', pseudoMin);
	axios.post('/api/sessions/add', pseudoMax);
	axios.post('/api/sessions/add', pseudoPerfect);

	await history.push({pathname: '/spot/confirmation', state: {spot:values.spotName}});

	dispatch({ type: FETCH_USER, payload: res.data.user});

 };

 export const saveSession = async (values, history) => {

 	var min = values.time.getMinutes();
 	var hour = values.time.getHours();
 	if(min > 30){
 		hour = hour + 1
 	};

	var date = values.date.getTime()/1000;
  var epochDate = date + (Math.round(hour/3) * 10800)

  console.log(epochDate);

 	const location = await axios.get('/api/location?spot=' + values.spot);
	const locationVal = location.data[0].location;

 	const currentConditions = await axios.get('/api/condition/history?date=' + epochDate + '&location=' + locationVal);

 	console.log(currentConditions);

	const newValues = {
		daytime: epochDate,
		condition: {
			rating: values.rating,
			swellSize: currentConditions.swellSize,
			swellDirection: currentConditions.swellDir,
			swellPeriod: currentConditions.swellPeriod,
			swellEnergy: currentConditions.swellEnergy,
			windSpeed: currentConditions.windSpeed,
			windDirection: currentConditions.windDirection,
			tide: currentConditions.tide
		},
		pseudo: false,
		comments: values.comments,
		spot: values.spot
	};

	var pseudoValues = {
		daytime: epochDate,
		condition: {
			rating: 95,
			swellSize: currentConditions.swellSize + values.pseudoSwell,
			swellDirection: values.pseudoSwellDir,
			swellPeriod: currentConditions.swellPeriod,
			swellEnergy: (currentConditions.swellSize + values.pseudoSwell) * (currentConditions.swellSize + values.pseudoSwell) * currentConditions.swellPeriod,
			windSpeed: currentConditions.windSpeed + values.pseudoWind,
			windDirection: values.pseudoWindDir,
			tide: currentConditions.tide + values.pseudoTide
		},
		pseudo: true,
		comments: null,
		spot: values.spot
	}

	const res = await axios.post('/api/sessions/add', newValues);
	axios.post('/api/sessions/add', pseudoValues);

	await history.push({pathname: '/home'});

	//dispatch();

 };