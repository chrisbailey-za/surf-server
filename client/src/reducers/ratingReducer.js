import { FETCH_RATINGS } from '../actions/types';

export default function(state = [], action) {
	switch(action.type) {
		case FETCH_RATINGS:
			return action.payload || false;
		default:
			return state;
	}	
}