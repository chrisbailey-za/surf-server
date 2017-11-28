import React from 'react';
import $ from 'jquery';

export default ({ input, label, sliderId }) => {

	var direction = (val) => {
				if (val > 300 || val < 50){
					return 'S';
				}
				else if(val > 50 & val < 200){
					return 'W'
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
						<span id={sliderId + 'Direction'} className="flow-text" style={{fontSize:'1.8em', fontWeight:'bold'}}>{direction(input.value)}</span><br></br>
						<span id={sliderId + 'Degrees'} className="flow-text" style={{fontSize:'1em'}}>{input.value} &#176;</span>
					</div>				  	
				</div>
		  </div>
		);
};