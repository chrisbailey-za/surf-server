import React from 'react';
import { SelectField, MenuItem } from 'material-ui';


export default ({ input, label }) => {

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
	  		 	>
		  		 	<MenuItem value={1} primaryText="Option1" />
	          <MenuItem value={2} primaryText="Option2" />
	          <MenuItem value={3} primaryText="Option3" />
	          <MenuItem value={4} primaryText="Option4" />
	          <MenuItem value={5} primaryText="Option5" />
  				</SelectField>
		  	</div>
		  </div>
		);
};