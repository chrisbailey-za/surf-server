import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () => async dispatch => {
	const res = await axios.get('/api/current_user');

	dispatch({ type: FETCH_USER, payload: res.data });
};

export const saveSpot = (values, history) => async dispatch => {

	var newValues = {
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

	var pseudoMin = {
		daytime: null,
		condition: {
			rating: 75,
			dayTime: null,
			swellSize: values.swellSize[0],
			swellDirection: values.swellDir,
			swellPeriod: 14,
			swellEnergy: values.swellSize[0]*values.swellSize[0]*14,
			windSpeed: values.windSpeed[0],
			windDirection: values.windDir,
			tide: values.tide[0]
	 	},
		pseudo: true,
		comments: null,
		_spot: newValues.spotName
	};

	var pseudoMax = {
		daytime: null,
		condition: {
			rating: 75,
			dayTime: null,
			swellSize: values.swellSize[1],
			swellDirection: values.swellDir,
			swellPeriod: 14,
			swellEnergy: values.swellSize[1]*values.swellSize[1]*14,
			windSpeed: values.windSpeed[1],
			windDirection: values.windDir,
			tide: values.tide[1]
		},
		pseudo: true,
		comments: null,
		_spot: newValues.spotName
	};

	var pseudoPerfect = {
		daytime: null,
		condition: {
			rating: 100,
			dayTime: null,
			swellSize: (values.swellSize[0]+values.swellSize[1])/2,
			swellDirection: values.swellDir,
			swellPeriod: 18,
			swellEnergy: ((values.swellSize[0]+values.swellSize[1])/2)*((values.swellSize[0]+values.swellSize[1])/2)*14,
			windSpeed: (values.windSpeed[0]+values.windSpeed[1])/2,
			windDirection: values.windDir
		},
		pseudo: true,
		comments: null,
		_spot: newValues.spotName
	}

	const res = await axios.post('/api/spots/add', newValues);
	axios.post('/api/session/add', pseudoMin);
	axios.post('/api/session/add', pseudoMax);
	axios.post('/api/session/add', pseudoPerfect);

	history.push({pathname: '/spot/confirmation', state: {spot:values.spotName}});

	dispatch({ type: FETCH_USER, payload: res.data});

 };