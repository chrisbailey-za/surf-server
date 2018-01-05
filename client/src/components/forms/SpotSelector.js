import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { SelectField, MenuItem } from 'material-ui';


const SpotSelector = ({ input, label, spots, meta:{ error, touched} }) => {

	const spotList = (() => {
			return _.map(spots, (spot) => {
		 		return <MenuItem value={spot.spotId} primaryText={spot.name} key={spot.spotId}/>
		 	})
	})();



	return (
		  <div className="row valign-wrapper">
		  	<div className="col s5 m3">
		  		<label className="flow-text">{label}</label>
		  	</div>
		  	<div className="col s7 m9 input-field">
	  		 	<SelectField {...input} 
	  		 		className="mcol s9 " 
	  		 		onChange={(event, key, payload) => input.onChange(payload)}
	  		 		style={{width:'100%'}}
	  		 		selectedMenuItemStyle={{color:'#ff9800'}}
	  		 	>
	  		 		{spotList}
	  		 		<Link to="/spot/add"><MenuItem style={{color:'#00838F'}}	value='0' primaryText="Add a new Spot" /></Link>
  				</SelectField>
  				<div className="red-text">
		  			{touched && error}
		  		</div>
		  	</div>
		  </div>
		);
};

export default SpotSelector