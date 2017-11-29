import React from 'react';

export default ({ unit, input, label, min, max, step }) => {

	return (
		  <div className="row valign-wrapper">
		  	<div className="col s3 m3">
		  		<label className="flow-text">{label}</label>
		  	</div>
		  	<div className="col s6 m8">
			  	<p className="range-field">
			  		<input {...input} type="range" min={min} max={max} step={step}></input>
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