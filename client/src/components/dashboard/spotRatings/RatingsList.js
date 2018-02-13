import React from 'react';

const	modifyArr = (ratings, currentSpot, hideNights) => {
		var newArr = ratings.find((i) => i._spot  === currentSpot);
		newArr = newArr.ratingArr;
		if(hideNights){
			newArr = newArr.filter((entry) => new Date(entry.date*1000).getHours() >= 5 && new Date(entry.date*1000).getHours() <= 21);
		}
		return newArr;
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

const	percentageToHsl = (percentage, hue0, hue1) => {
  var hue = (percentage * (hue1 - hue0)) + hue0;
  var perc = (1 - percentage)*50 + 50;
  return 'hsl(' + hue + ', 100%, ' + perc + '%)';
}


const RatingsList = ({ ratings, currentSpot, hideNights }) => {
		const initialArr = modifyArr(ratings, currentSpot, hideNights)

		if(initialArr){
		return initialArr.map(({ date, score}) => {
			return(
					<div className='col' key={date} style={{textAlign:'center', cursor:'move'}}>
							<div className="row valign-wrapper" style={{marginBottom:'0px', paddingTop:'3px', border:'lightgrey', borderStyle: 'solid', borderWidth:'1px', backgroundColor: 'lightgrey'}}>
					  		<div className="col" style={{width: '35px', height:'22px', overflow:'hidden'}}>{getWeekday(new Date(date*1000).getDay())}</div>
					  	</div>
					  	<div className="row valign-wrapper" style={{marginBottom:'0px', paddingTop:'3px', border:'lightgrey', borderStyle: 'solid', borderWidth:'1px', backgroundColor: 'lightgrey'}}>
					  		<div className="col" style={{width: '35px', height:'22px', overflow:'hidden'}}>{new Date(date*1000).getDate()}</div>
					  	</div>
					  	<div className="row valign-wrapper" style={{marginBottom:'0px', paddingTop:'3px', border:'lightgrey', borderStyle: 'solid', borderWidth:'1px', backgroundColor: 'lightgrey'}}>
					  		<div className="col" style={{width: '35px', height:'22px', overflow:'hidden'}}>{makeHour(new Date(date*1000).getHours())}</div>
					  	</div>
							<div className="row valign-wrapper" style={{marginBottom:'0px', paddingTop:'3px', border:'lightgrey', borderStyle: 'solid', borderWidth:'1px', backgroundColor: percentageToHsl(score/10, 40, 0)}}>
					  		<div className="col" style={{width: '35px', height:'22px', overflow:'hidden'}}>{score.toFixed(0)}</div>
					  	</div>
					</div>
			)
		});
	}else{ return null }
}

export default RatingsList;