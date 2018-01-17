import React from 'react';
import SecondaryRowLabels from './SecondaryRowLabels'

export default ({ showSecondary }) => {

	return (
			<div className="col grey darken-1 white-text hide-on-small-only" style={{width:'18vw', fontSize:'15px', margin:'0.5rem 0 40px 10px', border:'darkgrey', borderStyle: 'solid', borderWidth:'1px'}}>
			  	<div className="row valign-wrapper" style={{marginBottom:'0px', padding: '4px 0 1px 0'}}>
			  		<div className="col s12">Weekday</div>
			  	</div>
			  	<div className="row valign-wrapper" style={{marginBottom:'0px', padding: '4px 0 1px 0'}}>
			  		<div className="col s12">Date</div>
			  	</div>
			  	<div className="row valign-wrapper" style={{marginBottom:'0px', padding: '4px 0 1px 0'}}>
			  		<div className="col s12">Time</div>
			  	</div>
			  	<div className="row valign-wrapper" style={{marginBottom:'0px', padding: '4px 0 1px 0'}}>
			  		<div className="col s12">Swell Size</div>
			  	</div>
			  	<div className="row valign-wrapper" style={{marginBottom:'0px', padding: '4px 0 1px 0'}}>
						<div className="col s12">Swell Period</div>				  	
					</div>
					<div className="row valign-wrapper" style={{marginBottom:'0px', padding: '4px 0 1px 0'}}>
						<div className="col s12">Swell Energy</div>				  	
					</div>
					<div className="row valign-wrapper" style={{marginBottom:'0px', padding: '4px 0 1px 0'}}>
						<div className="col s12">Swell Direction</div>
					</div>
						{showSecondary?<SecondaryRowLabels />:null}
					<div className="row valign-wrapper" style={{marginBottom:'0px', padding: '4px 0 1px 0'}}>
						<div className="col s12">Wind Speed</div>
					</div>
					<div className="row valign-wrapper" style={{marginBottom:'0px', padding: '4px 0 1px 0'}}>
						<div className="col s12">Wind Direction</div>
					</div>
					<div className="row valign-wrapper" style={{marginBottom:'0px', padding: '4px 0 1px 0'}}>
						<div className="col s12">Tide</div>				  	
					</div>
			</div>
)};