import React, { Component } from 'react';
import SecondaryData from './SecondaryData';
import ArrowComp from './ArrowComp';

const	modifyArr = (arr, hideNights, showEvery) => {
		let newArr = arr.filter((_,i) => i % showEvery === 0);
		if(hideNights){
			newArr = newArr.filter((entry) => new Date(entry.dayTime*1000).getHours() >= 5 && new Date(entry.dayTime*1000).getHours() <= 21);
		}
		return newArr;
	}

const	percentageToHsl = (percentage, hue0, hue1) => {
    var hue = (percentage * (hue1 - hue0)) + hue0;
    var perc = (1 - percentage)*50 + 50;
    return 'hsl(' + hue + ', 100%, ' + perc + '%)';
	}


const percentageToHslWind = (percentage, hue0, hue1) => {
		var hue = ''
		if (percentage > 0.666666){
    	hue = (percentage * (0 - 270)) + 270;
    }else{
    	hue = (percentage * (0 - 180)) + 180;
    }
    return 'hsl(' + hue + ', 100%, 80%)';
	}

const getWeekday = (n) => {
		const weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
		return weekday[n];
	}

const makeHour = (n) => {
		if(n < 10){
			return '0'+n+'h' 
		}else{
			return n+'h'
		}
	}	

export default ({ forecast, showSecondary, hideNights, showEvery }) => {
		const initialArr = modifyArr(forecast, hideNights, showEvery)

		return initialArr.map(({ dayTime, primarySwellSize,primarySwellEnergy, primarySwellDirection, primarySwellPeriod, secondarySwellSize, secondarySwellEnergy, secondarySwellDirection, secondarySwellPeriod, windSpeed, windDirection, tide}) => {
			return(
					<div className='col' key={dayTime} style={{textAlign:'center', cursor:'move'}}>
							<div className="row valign-wrapper" style={{marginBottom:'0px', paddingTop:'3px', border:'lightgrey', borderStyle: 'solid', borderWidth:'1px', backgroundColor: 'lightgrey'}}>
					  		<div className="col" style={{width: '35px', height:'22px', overflow:'hidden'}}>{getWeekday(new Date(dayTime*1000).getDay())}</div>
					  	</div>
					  	<div className="row valign-wrapper" style={{marginBottom:'0px', paddingTop:'3px', border:'lightgrey', borderStyle: 'solid', borderWidth:'1px', backgroundColor: 'lightgrey'}}>
					  		<div className="col" style={{width: '35px', height:'22px', overflow:'hidden'}}>{new Date(dayTime*1000).getDate()}</div>
					  	</div>
					  	<div className="row valign-wrapper" style={{marginBottom:'0px', paddingTop:'3px', border:'lightgrey', borderStyle: 'solid', borderWidth:'1px', backgroundColor: 'lightgrey'}}>
					  		<div className="col" style={{width: '35px', height:'22px', overflow:'hidden'}}>{makeHour(new Date(dayTime*1000).getHours())}</div>
					  	</div>
							<div className="row valign-wrapper" style={{marginBottom:'0px', paddingTop:'3px', border:'lightgrey', borderStyle: 'solid', borderWidth:'1px', backgroundColor:percentageToHsl(primarySwellSize/10, 210, 250)}}>
					  		<div className="col" style={{width: '35px', height:'22px', overflow:'hidden'}}>{primarySwellSize.toFixed(1)}</div>
					  	</div>
							<div className="row valign-wrapper" style={{marginBottom:'0px', paddingTop:'3px', border:'lightgrey', borderStyle: 'solid', borderWidth:'1px', backgroundColor:percentageToHsl((primarySwellPeriod-5)/20, 45, 90)}}>
								<div className="col" style={{width: '35px', height:'22px', overflow:'hidden'}}>{primarySwellPeriod.toFixed(0)}</div>				  	
							</div>
							<div className="row valign-wrapper" style={{marginBottom:'0px', paddingTop:'3px', border:'lightgrey', borderStyle: 'solid', borderWidth:'1px', backgroundColor:percentageToHsl(primarySwellEnergy/400, 45, 0)}}>
								<div className="col" style={{width: '35px', height:'22px', overflow:'hidden'}}>{primarySwellEnergy.toFixed(0)}</div>				  	
							</div>
							<div className="row valign-wrapper" style={{marginBottom:'0px', paddingTop:'3px', border:'lightgrey', borderStyle: 'solid', borderWidth:'1px'}}>
								<div className="col" style={{width: '35px', height:'22px', overflow:'hidden'}}><ArrowComp value={primarySwellDirection} /></div>
							</div>
							{showSecondary?<SecondaryData secondarySize={secondarySwellSize} secondaryPeriod={secondarySwellPeriod} secondaryEnergy={secondarySwellEnergy} secondaryDirection={secondarySwellDirection} percentageToHsl={percentageToHsl} />:null}
							<div className="row valign-wrapper" style={{marginBottom:'0px', paddingTop:'3px', border:'lightgrey', borderStyle: 'solid', borderWidth:'1px', backgroundColor:percentageToHslWind(windSpeed/60, 180, 0)}}>
								<div className="col" style={{width: '35px', height:'22px', overflow:'hidden'}}>{windSpeed.toFixed(0)}</div>
							</div>
							<div className="row valign-wrapper" style={{marginBottom:'0px', paddingTop:'3px', border:'lightgrey', borderStyle: 'solid', borderWidth:'1px'}}>
								<div className="col" style={{width: '35px', height:'22px', overflow:'hidden'}}><ArrowComp value={windDirection} /></div>
							</div>
							<div className="row valign-wrapper" style={{marginBottom:'0px', paddingTop:'3px', border:'lightgrey', borderStyle: 'solid', borderWidth:'1px', backgroundColor:percentageToHsl(tide/2.5, 280, 240)}}>
								<div className="col" style={{width: '35px', height:'22px', overflow:'hidden'}}>{tide?tide.toFixed(2):null}</div>			  	
							</div>
					</div>
			)
		});
	 }