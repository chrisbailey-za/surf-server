import React from 'react';
import { DatePicker } from 'material-ui';

export default ({ input, label, meta:{ error, touched} }) => {

	var minDate = (() => {
		var date = new Date();
		var startDate = date - 1000 * 60 * 60 * 24 * 5;
		startDate = new Date(startDate);
		return startDate
	})()

	return (
		  <div className="row valign-wrapper">
		  	<div className="col m3 s5">
		  		<label className="flow-text">{label}</label>
		  	</div>
		  	<div className="col m9 s7 input-field">
					<DatePicker maxDate={new Date()} minDate={minDate} {...input} autoOk={true} textFieldStyle={{width:'100%'}} onChange={( blank, val) => input.onChange(val)}></DatePicker>
		  		<div className="red-text">
		  			{touched && error}
		  		</div>
		  	</div>
		  </div>
		);
};