import React from 'react';
import { Link } from 'react-router-dom';
import { DropDownMenu, MenuItem } from 'material-ui';


const SpotSelector = ({ changeSpot, label, spots, currentSpot }) => {

	const spotList = (() => {
			return spots.map((spot) => {
		 		return <MenuItem value={spot._id} primaryText={spot.spotName} key={spot._id}/>
		 	})
	})();

	return (
		  <div className="row valign-wrapper">
		  	<div className="col s5 m3">
		  		<label className="flow-text">{label}</label>
		  	</div>
		  	<div className="col s7 m9 input-field">
	  		 	<DropDownMenu
	  		 		value={currentSpot}
	  		 		className="mcol s9 "
	  		 		autoWidth={false}
	  		 		onChange={(event, key, payload) => changeSpot(payload)}
	  		 		style={{width:'100%'}}
	  		 		selectedMenuItemStyle={{color:'#ff9800'}}
	  		 	>
	  		 		{spotList}
	  		 		<Link to="/spot/add"><MenuItem style={{color:'#00838F'}}	value='0' primaryText="Add a new Spot" /></Link>
  				</DropDownMenu>
		  	</div>
		  </div>
		);
};

export default SpotSelector