import React from 'react';

export default ({ input, label }) => {

	return (
		  <div className="row valign-wrapper">
		  	<div className="col s3 m3">
		  		<label className="flow-text">{label}</label>
		  	</div>
		  	<div className="col s6 m8">
			  	<p className="range-field">
			  		<input {...input} type="range" id="test5" min="0" max="100" ></input>
			  	</p>
		  	</div>
		  	<div className="col s3 m1 valign-wrapper">
		  		<div id="surfVal" style={{backgroundColor: 'rgba(255,152,0 ,'+input.value/100 +')' }}></div>
			  	<span style={{position:'absolute', width:'50px', textAlign: 'center'}}>
				  		{input.value}
				  </span>
		  	</div>
		  </div>
		);
};