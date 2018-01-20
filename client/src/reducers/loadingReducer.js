import { LOADING_STATE } from '../actions/types'

export default function(state = null, action) {
	switch(action.type) {
		case LOADING_STATE:
			return action.payload===false?true:false;
		default:
			return state;
	}	
}