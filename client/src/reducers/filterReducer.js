import { FILTER_SESSIONS } from '../actions/types'

export default function(state = {spots: null, ratings: {min:null, max:null}, timeGrouping: null, dataGrouping: null}, action) {
	switch(action.type) {
		case FILTER_SESSIONS:

			switch(action.payload.type) {
				case 'spots': return Object.assign({}, state, {
	         spots: action.payload.val
	      })
				case 'ratings': return Object.assign({}, state, {
	        ratings: { min: action.payload.val.min, max: action.payload.val.max}
	      })
				case 'timeGrouping': return Object.assign({}, state, {
	        timeGrouping: action.payload.val
	      })
				case 'dataGrouping': return Object.assign({}, state,{
	        dataGrouping: action.payload.val
	      })
				default:
					return state;
			}
		default:
			return state;
	}	
}