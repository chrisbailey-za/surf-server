import { FETCH_NOTIFICATIONS } from '../actions/types';

export default function(state = [], action) {
	switch(action.type) {
		case FETCH_NOTIFICATIONS:
			return action.payload || false;
		default:
			return state;
	}	
}