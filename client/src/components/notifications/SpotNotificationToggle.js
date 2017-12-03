import React from 'react';
import { Toggle } from 'material-ui';

export default ({ input, label, rating, deactivate, isToggled }) => {


	return (
		  <div className="col s6 m4 valign-wrapper">
		  	<div className="col s6 ">
		  		<label className="flow-text">{label}</label>
		  	</div>
		  	<div className="col s6 valign-wrapper">
		  		<Toggle onToggle={( blank, val) => input.onChange(val)} defaultToggled={isToggled} thumbSwitchedStyle={{backgroundColor:'#0097a7'}}></Toggle>
		  	</div>
		  </div>
		);
};