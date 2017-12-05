import React from 'react';
import { TimePicker } from 'material-ui';

export default ({ input, label, meta: {touched, error} }) => {

	return (
		  <div className="row valign-wrapper">
		  	<div className="col m3 s5">
		  		<label className="flow-text">{label}</label>
		  	</div>
		  	<div className="col m9 s7 input-field">
					<TimePicker {...input} textFieldStyle={{width:'100%'}} format='24hr' onChange={( blank, val) => input.onChange(val)}></TimePicker>
		  		<div className="red-text">
		  			{touched && error}
		  		</div>
		  	</div>
		  </div>
		);
};