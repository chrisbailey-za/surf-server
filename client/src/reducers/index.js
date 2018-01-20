import { combineReducers } from 'redux';
import authReducer from './authReducer';
import notificationReducer from './notificationReducer';
import spotReducer from './spotReducer';
import sessionReducer from './sessionReducer';
import forecastReducer from './forecastReducer';
import loadingReducer from './loadingReducer';
import { reducer as reduxForm } from 'redux-form';

export default combineReducers({
	auth: authReducer,
	form: reduxForm,
	notifications: notificationReducer,
	spots: spotReducer,
	sessions: sessionReducer,
	forecast: forecastReducer,
	loading: loadingReducer
});