import React from 'react';

export default ({ input, label, meta:{ error, touched } }) => {
	return (
		  <div className="row valign-wrapper">
		  	<div className="col m3 s5">
		  		<label className="flow-text">{label}</label>
		  	</div>
		  	<div className="col m9 s7 input-field">
		  		<input {...input} placeholder="Add the name of your spot" type="text" className="validate"></input>
		  		<div className="red-text">
	  				{touched && error}
	  			</div>
		  	</div>
		  </div>
		);
};