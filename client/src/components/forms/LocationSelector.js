import React from 'react';
import _ from 'lodash';
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
		  		 	<MenuItem value={1} primaryText="option 1" />
			 			<MenuItem value={2} primaryText="option 2" />
			 			<MenuItem value={3} primaryText="option 3" />
			 			<MenuItem value={4} primaryText="option 4" />
  				</SelectField>
  				<div className="red-text">
		  			{touched && error}
		  		</div>
		  	</div>
		  </div>
		);
};

export default SpotSelector