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
	}

	const res = await axios.post('/api/spots/add', newValues);
	history.push({pathname: '/spot/confirmation', state: {spot:values.spotName}});

	dispatch({ type: FETCH_USER, payload: res.data});

 };