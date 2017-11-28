import React from 'react';
import { DatePicker } from 'material-ui';

export default ({ input, label }) => {

	return (
		  <div className="row valign-wrapper">
		  	<div className="col m3 s5">
		  		<label className="flow-text">{label}</label>
		  	</div>
		  	<div className="col m9 s7 input-field">
					<DatePicker {...input} autoOk={true} textFieldStyle={{width:'100%'}} onChange={( blank, val) => input.onChange(val)}></DatePicker>
		  	</div>
		  </div>
		);
};