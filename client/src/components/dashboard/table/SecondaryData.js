import React from 'react';
import ArrowComp from './ArrowComp';

export default ({ secondarySize, secondaryPeriod, secondaryEnergy, secondaryDirection, percentageToHsl, percentageToHslPeriod }) => {

	return (
					<div>
				<div className="row valign-wrapper" style={{marginBottom:'0px', paddingTop:'3px', border:'lightgrey', borderStyle: 'solid', borderWidth:'1px', backgroundColor:percentageToHsl(secondarySize/10, 210, 250)}}>
					<div className="col" style={{width: '35px', height:'22px', overflow:'hidden'}}>{secondarySize.toFixed(1)}</div>
				</div>
				<div className="row valign-wrapper" style={{marginBottom:'0px', paddingTop:'3px', border:'lightgrey', borderStyle: 'solid', borderWidth:'1px', backgroundColor:percentageToHslPeriod((secondaryPeriod - 8 )/12, 360, 360)}}>
					<div className="col" style={{width: '35px', height:'22px', overflow:'hidden'}}>{secondaryPeriod.toFixed(0)}</div>
				</div>
				<div className="row valign-wrapper" style={{marginBottom:'0px', paddingTop:'3px', border:'lightgrey', borderStyle: 'solid', borderWidth:'1px', backgroundColor:percentageToHsl(secondaryEnergy/300, 45, 0)}}>
					<div className="col" style={{width: '35px', height:'22px', overflow:'hidden'}}>{secondaryEnergy.toFixed(0)}</div>
				</div>
				<div className="row valign-wrapper" style={{marginBottom:'0px', paddingTop:'3px', border:'lightgrey', borderStyle: 'solid', borderWidth:'1px'}}>
					<div className="col" style={{width: '35px', height:'22px', overflow:'hidden'}}><ArrowComp value={secondaryDirection} /></div>
				</div>
			</div>
		);
};