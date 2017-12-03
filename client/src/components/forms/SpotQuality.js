import React from 'react';
import { Rating } from 'material-ui-rating';


export default ({ input, label }) => {

	return (
		<div>
		  <div className="row valign-wrapper">
		  	<div className="col s5 m3">
		  		<label className="flow-text">{label}</label><br></br>
		  		<label style={{fontSize:'1em'}}>Where 5 stars is Cloudbreak and 1 star is Muizenberg</label>
		  	</div>
		  	<div className="col s7 m9">
			  	<div className="row input-field hide-on-med-and-down">
			  	  <Rating {...input}
		          max={5}
		          onChange={(value) => input.onChange(value)}
		          itemStyle={{width: 120, height:120, padding: 30}}
	        		itemIconStyle={{width: 60, height:60}}
		        />
			  	</div>
			  	<div className="row input-field hide-on-large-only">
			  	  <Rating {...input}
		          max={5}
		          onChange={(value) => input.onChange(value)}
		          itemStyle={{width: 28, height:28, padding: 5}}
	        		itemIconStyle={{width: 24, height:24}}
		        />
			  	</div>
			  </div>
		  </div>
		</div>
	);
};