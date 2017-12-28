import React from 'react';
import { SelectField, MenuItem } from 'material-ui';


const SpotSelector = ({ input, label, spots, meta:{ error, touched} }) => {

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
		  		 	<MenuItem value={848} primaryText="Kommetjie" />
			 			<MenuItem value={847} primaryText="Muizenberg" />
			 			<MenuItem value={227} primaryText="Eland's Bay" />
			 			<MenuItem value={1284} primaryText="Kleinmond" />
  				</SelectField>
  				<div className="red-text">
		  			{touched && error}
		  		</div>
		  	</div>
		  </div>
		);
};

export default SpotSelector