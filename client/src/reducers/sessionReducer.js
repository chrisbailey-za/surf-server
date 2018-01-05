import { FETCH_SESSIONS } from '../actions/types';

export default function(state = [], action) {
	switch(action.type) {
		case FETCH_SESSIONS:
			return action.payload || false;
		default:
			return state;
	}	
}