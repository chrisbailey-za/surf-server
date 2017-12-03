import React from 'react';
import Nouislider from 'react-nouislider';

export default ({ input, func, step, label, start, range, unit }) => {

	return (
		  <div className="row valign-wrapper">
		  	<div className="col s3 m3">
		  		<label className="flow-text">{label}</label>
		  	</div>
		  	<div className="col s6 m8">
			  		<Nouislider onChange={func.bind(this)} id="windSpeedComp"
			  		step={step}
			  		tooltips={
			  		[{to: function(value) {
						  return Math.round(value*(1/step))/(1/step);
						}},{to: function(value) {
						  return Math.round(value*(1/step))/(1/step);
						}}]}
						start={start} range={range} connect style={{width:'100%'}}>
						</Nouislider>
		  	</div>
		  	<div className="col s3 m1 valign-wrapper">
			  	<span style={{ textAlign: 'center', fontWeight:'bold'}}>
				  		Measured in {unit}
				  </span>
		  	</div>
		  </div>
		);
};