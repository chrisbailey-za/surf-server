import React from 'react';

export default ({ input, label, meta:{touched, error} }) => {

	return (
		  <div className="row valign-wrapper">
		  	<div className="col s3 m3">
		  		<label className="flow-text">{label}</label>
		  	</div>
		  	<div className="col s6 m8">
			  	<input {...input} type="range" id="rating" min="0" max="100" style={{height:'40px'}}></input>
			  	<div className="red-text">
		  			{touched && error}
		  		</div>
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