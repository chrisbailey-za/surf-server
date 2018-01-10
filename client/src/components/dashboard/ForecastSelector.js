import React from 'react';
import { DropDownMenu, MenuItem } from 'material-ui';

const SpotSelector = ({ label, updateFunc, location }) => {

	return (
		  <div className="row valign-wrapper">
		  	<div className="col m3 hide-on-small-only">
		  		<label className="flow-text">{label}</label>
		  	</div>
		  	<div className="col s12 m9 input-field">
	  		 	<DropDownMenu
	  		 		value={location}
	  		 		className="mcol s9 "
	  		 		autoWidth={false}
	  		 		onChange={(event, index, payload) => updateFunc(payload)}
	  		 		style={{width:'100%'}}
	  		 		selectedMenuItemStyle={{color:'#ff9800'}}
	  		 	>
		  		 	<MenuItem value={848} primaryText="Kommetjie" />
			 			<MenuItem value={847} primaryText="Muizenberg" />
			 			<MenuItem value={227} primaryText="Eland's Bay" />
			 			<MenuItem value={1284} primaryText="Kleinmond" />
  				</DropDownMenu>
		  	</div>
		  </div>
		);
};

export default SpotSelector