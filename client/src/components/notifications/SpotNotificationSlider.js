import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

export default ({ input, label, rating, func, isActive }) => {

	return (
		  	<div className="col s6 m8">
		  			<Slider onChange={input.onChange} {...isActive} defaultValue={100-(parseInt(rating)*5)} />
		  	</div>
		);
};