import React from 'react';

export default ({ input, label, sliderId }) => {

	var direction = (val) => {
				if (val >= 348.75 || val < 11.25){
					return 'S';
				}
				else if(val >= 11.25 & val < 33.75){
					return 'SSW'
				}
				else if(val >= 33.75 & val < 56.25){
					return 'SW'
				}
				else if(val >= 56.25 & val < 78.75){
					return 'WSW'
				}
				else if(val >= 78.75 & val < 101.25){
					return 'W'
				}
				else if(val >= 101.25 & val < 123.75){
					return 'WNW'
				}
				else if(val >= 123.75 & val < 146.25){
					return 'NW'
				}
				else if(val >= 146.25 & val < 168.75){
					return 'NNW'
				}
				else if(val >= 168.75 & val < 191.25){
					return 'N'
				}
				else if(val >= 191.25 & val < 213.75){
					return 'NNE'
				}
				else if(val >= 213.75 & val < 236.25){
					return 'NE'
				}
				else if(val >= 236.25 & val < 258.75){
					return 'ENE'
				}
				else if(val >= 258.75 & val < 281.25){
					return 'E'
				}
				else if(val >= 281.25 & val < 303.75){
					return 'ESE'
				}
				else if(val >= 303.75 & val < 326.25){
					return 'SE'
				}
				else if(val >= 326.25 & val < 348.75){
					return 'SSE'
				}
				else{
					return '-'
				}
			}

	return (
		  <div className="row valign-wrapper">
		  	<div className="col m3 s5">
		  		<label className="flow-text">{label}</label>
		  	</div>
		  	<div className="col m4 s3">
					<div id={sliderId} style={{margin:'auto'}}></div>		  	
				</div>
				<div className="col m5 s4">
					<div style={{textAlign:'center'}}>
						<span className="flow-text" style={{fontSize:'1.8em', fontWeight:'bold'}}>{direction(input.value)}</span><br></br>
						<span className="flow-text" style={{fontSize:'1em'}}>{input.value} &#176;</span>
					</div>				  	
				</div>
		  </div>
		);
};