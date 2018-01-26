import { LOADING_RATING } from '../actions/types'

export default function(state = null, action) {
	switch(action.type) {
		case LOADING_RATING:
			return action.payload===false?true:false;
		default:
			return state;
	}	
}