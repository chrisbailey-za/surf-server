import axios from "axios";
import {
	FETCH_USER,
	FETCH_NOTIFICATIONS,
	FETCH_SPOTS,
	FETCH_SESSIONS,
	FETCH_FORECAST,
	LOADING_STATE
} from "./types";

export const fetchUser = () => async dispatch => {
	const res = await axios.get("/api/current_user");

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
			swellEnergy: values.swellSize[0]*values.swellSize[0]*14,
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
			swellEnergy: values.swellSize[1]*values.swellSize[1]*14,
			windSpeed: values.windSpeed[1],
			windDirection: values.windDir,
			tide: values.tide[1]
		},
		location: values.location
	};

	const res = await axios.post("/api/spots/add", newValues);

	const pseudoMin = {
		daytime: null,
		condition: {
			rating: 75,
			swellSize: values.swellSize[0],
			swellDirection: values.swellDir < 30 ? values.swellDir + 330 : values.swellDir - 30,
			swellPeriod: 14,
			swellEnergy: values.swellSize[0] * values.swellSize[0] * 14,
			windSpeed: values.windSpeed[0],
			windDirection: values.windDir < 30 ? values.windDir + 330 : values.windDir - 30,
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
			swellDirection: values.swellDir > 330 ? values.swellDir - 330 : values.swellDir + 30,
			swellPeriod: 14,
			swellEnergy: values.swellSize[1] * values.swellSize[1] * 14,
			windSpeed: values.windSpeed[1],
			windDirection: values.windDir > 330 ? values.windDir - 330 : values.windDir + 30,
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
			swellSize: (values.swellSize[0] + values.swellSize[1]) / 2,
			swellDirection: values.swellDir,
			swellPeriod: 18,
			swellEnergy:
				(values.swellSize[0] + values.swellSize[1]) /
				2 *
				((values.swellSize[0] + values.swellSize[1]) / 2) *
				14,
			windSpeed: (values.windSpeed[0] + values.windSpeed[1]) / 2,
			windDirection: values.windDir,
			tide: (values.tide[0] + values.tide[1]) / 2
		},
		pseudo: true,
		comments: null,
		spot: res.data.id
	};

	const pseudoCrap = {
		daytime: null,
		condition: {
			rating: 0,
			swellSize: 0,
			swellDirection: values.swellDir < 180 ? values.swellDir + 180: values.swellDir - 180,
			swellPeriod: 0,
			swellEnergy: 0,
			windSpeed: 100,
			windDirection: values.windDir < 180 ? values.windDir + 180: values.windDir - 180,
			tide: values.tide[1]>1.6 ? 0 : values.tide[0]<0.8 ? 2.5 : null
		},
		pseudo: true,
		comments: null,
		spot: res.data.id
	};

	axios.post("/api/sessions/add", pseudoMin);
	axios.post("/api/sessions/add", pseudoMax);
	axios.post("/api/sessions/add", pseudoPerfect);
	axios.post("/api/sessions/add", pseudoCrap);

	await history.push({
		pathname: "/spot/confirmation",
		state: { spot: values.spotName }
	});

	axios.post("/api/ratingmodel/update", { spotID: res.data.id })
	dispatch({ type: FETCH_USER, payload: res.data.user });
};

export const saveSession = (values, history) => async dispatch => {
	var min = values.time.getMinutes();
	var hour = values.time.getHours();
	if (min > 30) {
		hour = hour + 1;
	}

	var dateStamp = values.date.getTime();
	var epochDate = dateStamp / 1000 + Math.round(hour) * 3600;

	const location = await axios.get("/api/location?spot=" + values.spot);
	const locationVal = await location.data[0].location;

	const response = await axios.get(
		"/api/condition/history?date=" + epochDate + "&spot=" + locationVal
	);
	const currentConditions = response.data;

	const newValues = {
		daytime: new Date(epochDate * 1000),
		condition: {
			rating: values.rating,
			swellSize: currentConditions.primarySwellSize,
			swellDirection: currentConditions.primarySwellDirection,
			swellPeriod: currentConditions.primarySwellPeriod,
			swellEnergy: currentConditions.primarySwellEnergy,
			windSpeed: currentConditions.windSpeed,
			windDirection: currentConditions.windDirection,
			tide: currentConditions.tide
		},
		pseudo: false,
		comments: values.comments,
		spot: values.spot
	};

	const res = await axios.post("/api/sessions/add", newValues);

	if (values.pseudoToggle) {
		var pseudoValues = {
			daytime: new Date(epochDate * 1000),
			condition: {
				rating: 95,
				swellSize: currentConditions.primarySwellSize + values.pseudoSwell,
				swellDirection: values.pseudoSwellDir,
				swellPeriod: currentConditions.primarySwellPeriod,
				swellEnergy:
					(currentConditions.primarySwellSize + values.pseudoSwell) *
					(currentConditions.primarySwellSize + values.pseudoSwell) *
					currentConditions.primarySwellPeriod,
				windSpeed: currentConditions.windSpeed + values.pseudoWind,
				windDirection: values.pseudoWindDir,
				tide: currentConditions.tide + values.pseudoTide
			},
			pseudo: true,
			comments: null,
			spot: values.spot
		};

		axios.post("/api/sessions/add", pseudoValues);
	}

	await history.push({ pathname: "/home" });
	axios.post("/api/ratingmodel/update", { spotID: values.spot })

	dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchNotifications = () => async dispatch => {
	const res = await axios.get("/api/spots/fetchNotifications");

	dispatch({ type: FETCH_NOTIFICATIONS, payload: res.data });
};

export const fetchSpots = () => async dispatch => {
	const res = await axios.get("/api/spots/fetchAll");

	dispatch({ type: FETCH_SPOTS, payload: res.data });
};

export const fetchSessions = () => async dispatch => {
	const res = await axios.get("/api/sessions/fetchAll");

	dispatch({ type: FETCH_SESSIONS, payload: res.data });
};

export const fetchForecast = (location) => async dispatch => {
	
	dispatch({ type: LOADING_STATE, payload: false });

	const res = await axios.get("/api/forecast?spot=" + location);

	dispatch({ type: FETCH_FORECAST, payload: res.data });
	dispatch({ type: LOADING_STATE, payload: res.data });
};