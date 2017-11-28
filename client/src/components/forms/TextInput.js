import React from 'react';

export default ({ input, label }) => {
	return (
		  <div className="row valign-wrapper">
		  	<div className="col s12">
		  		<label className="flow-text">{label}</label>
		  		<textarea {...input} className="materialize-textarea" />
		  	</div>
		  </div>
		);
};