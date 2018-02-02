import React from 'react';

const	splitSpotRatings = ( ratings, spots ) => {
		const nowDate = new Date().getDate();
		const nowHour = new Date().getHours();

		console.log(nowDate + ' ' + nowHour);

		const todayElem = [];
		const tomorrowElem = [];
		const plusTwoElem = [];
		const plusThreeElem = [];
		const plusFourElem = [];
		
		ratings.map(({_spot, ratingArr}) => {

			var today = ratingArr.filter((entry) => new Date(entry.date*1000).getHours() >= nowHour && new Date(entry.date*1000).getDate() === nowDate && isDay(entry.date));
			const tomorrow = ratingArr.filter((entry) => new Date(entry.date*1000 - 86400000).getDate() === nowDate && isDay(entry.date));
			const plusTwo = ratingArr.filter((entry) => new Date(entry.date*1000 - 172800000).getDate() === nowDate && isDay(entry.date));
			const plusThree = ratingArr.filter((entry) => new Date(entry.date*1000 - 259200000).getDate() === nowDate && isDay(entry.date));			
			const plusFour = ratingArr.filter((entry) => new Date(entry.date*1000 - 345600000).getDate() === nowDate && isDay(entry.date));

			if(nowHour > 19){today = [{score:'tooLate'}]}

			const topTimeToday = getMax(today);
			const topTimeTomorrow = getMax(tomorrow);
			const topTimePlusTwo = getMax(plusTwo);
			const topTimePlusThree = getMax(plusThree);
			const topTimePlusFour = getMax(plusFour);

			todayElem.push({ label: 'Today', ratings: topTimeToday.score, time: topTimeToday.time, spot: findSpot(_spot, spots)});
			tomorrowElem.push({ label: 'Tomorrow', ratings: topTimeTomorrow.score, time: topTimeTomorrow.time, spot: findSpot(_spot, spots)})
			plusTwoElem.push({ label: getWeekday(new Date(plusTwo[0].date*1000).getDay()), ratings: topTimePlusTwo.score, time: topTimePlusTwo.time, spot: findSpot(_spot, spots)})
			plusThreeElem.push({ label: getWeekday(new Date(plusThree[0].date*1000).getDay()), ratings: topTimePlusThree.score, time: topTimePlusThree.time, spot: findSpot(_spot, spots)})
			plusFourElem.push({ label: getWeekday(new Date(plusFour[0].date*1000).getDay()), ratings: topTimePlusFour.score, time: topTimePlusFour.time, spot: findSpot(_spot, spots)})

		});

		const elemsArr = [todayElem, tomorrowElem, plusTwoElem, plusThreeElem, plusFourElem];

		var resultArr = elemsArr.map((elem) => {
			var topSessionsRaw = elem.sort((a, b) => b.ratings > a.ratings).slice(0, 3);
			return topSessionsRaw;
		})

		var topRatings = resultArr.map((day) => {
			var topByDay = {}
			topByDay.values = day.map(({ratings, time, spot}) => {
				return ({ratings, time, spot});
			})
			topByDay.label = day[0]?day[0].label:null;
			return topByDay
		});

		return topRatings;

	}


const findSpot = (spot, spotList) => {
	const spotObj = spotList.find((a) => a._id === spot);
	return spotObj.spotName
}

const getMax = (arr) => {
	const max = arr.map((a) => a.score).reduce((b, c) => Math.max(b, c));
	const obj = arr.find((a) => a.score === max );
	return {score: obj.score, time: makeHour(new Date(obj.date*1000).getHours())};
}

const getWeekday = (n) => {
		const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
		return weekday[n];
	}

const isDay = (date) => {
		const hour = new Date(date*1000).getHours()
		if(hour > 6 && hour < 20){
			return true;
		}else{
			return false;
		}
	}

const makeHour = (n) => {
		if(n < 10){
			return '0'+n+'h' 
		}else{
			return n+'h'
		}
	}	

const renderDays = (ratingSummary) => {
	return ratingSummary.map(({ label, values }) => {
		return (
			<div className="col cyan lighten-5" style={window.innerWidth<600?{padding: '0px', marginRight:'5px', paddingTop:'20px' }:{width: '19%', padding: '0px', margin:'auto', paddingTop:'20px' }}>
				<div className="row cyan-text text-darken-2" style={window.innerWidth<600?{width: '180px', textTransform: 'uppercase', fontWeight:'bold'}:{ textTransform: 'uppercase', fontWeight:'bold' }}>{label}</div>
				{renderSuggestions(values)}
			</div>
		)
	});
}


const renderSuggestions = (values) => {
	return values.map(({ratings, spot, time}) => {
			if(ratings == 'tooLate'){
				return(
					<div className="row"><span>Too late bru,<br></br> check tomorrow</span></div>
				)
			}else{
				return(
					<div className="row">
						<div>{ratings>25?<i className="material-icons orange-text" style={{verticalAlign: 'text-bottom'}}>star</i>:null}
						<span style={{fontSize:'22px', fontWight:'bold'}}>{ratings.toFixed(1)}</span>
						{ratings>25?<i className="material-icons orange-text" style={{verticalAlign: 'text-bottom'}}>star</i>:null}</div>
						<div className="row"><span>{spot} </span><span>at</span><span> {time}</span></div>
					</div>
				)
			}
	})
}


const BestTable = ({ ratings, spots, hideNights }) => {
		const ratingSummary = splitSpotRatings(ratings, spots);
		console.log(ratingSummary);

		if(ratingSummary[0].label){

			return(
					<div className='col' style={{textAlign:'center'}}>
						<div className="row valign-wrapper" style={{ marginBottom: '0px', alignContent:'center', color:'#0097a7', fontSize:'2em', paddingTop: '20px' }}>
							<span style={{margin: 'auto'}}>The Recce schemes you should Surf here:</span>
						</div>
						<div className="row valign-wrapper" style={{ paddingTop: '25px', display: 'flex', overflowX: 'scroll' }}>
				  		{renderDays(ratingSummary)}
				  	</div>
					</div>
			)

		}else{ return null }
}

export default BestTable;