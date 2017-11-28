import React from 'react';

export default ({ unit, input, label }) => {

	return (
		  <div className="row valign-wrapper">
		  	<div className="col s3 m3">
		  		<label className="flow-text">{label}</label>
		  	</div>
		  	<div className="col s6 m8">
			  	<p className="range-field">
			  		<input {...input} type="range" min="-10" max="10" step="0.5"></input>
			  	</p>
		  	</div>
		  	<div className="col s3 m1 valign-wrapper">
			  	<span>
				  		{input.value > 0 ? '+'+input.value : input.value} {unit}
				  </span>
		  	</div>
		  </div>
		);
};