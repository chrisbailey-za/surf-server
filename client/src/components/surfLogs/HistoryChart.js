import React, { Component } from "react";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryLabel } from 'victory';

 // eslint-disable-next-line
Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

function getDates(startDate, stopDate, type) {

    var dateArray = [];
    var currentDate = startDate;
    		switch(type){
		      case 'month':
    			  while (currentDate <= stopDate) {
			        dateArray.push(new Date (currentDate));
			        currentDate = currentDate.setMonth(currentDate.getMonth() + 1)
			       }
			      break
		      case 'year':
    			  while (currentDate <= stopDate) {
			        dateArray.push(new Date (currentDate));
			        currentDate = currentDate.setMonth(currentDate.getFullYear() + 1)
			       }
			      break
			    default:
    			  while (currentDate <= stopDate) {
			        dateArray.push(new Date (currentDate));
			        currentDate = currentDate.addDays(1);
			       }
        }
    return dateArray;
}


function formatDate(date, type) {
  var monthNames = [
    "Jan", "Feb", "Mar",
    "Apr", "May", "Jun", "Jul",
    "Aug", "Sep", "Oct",
    "Nov", "Dec"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();
  switch(type){
  	case 'month':
  	  return monthNames[monthIndex] + ' ' + year;
  	case 'year':
  	  return year.toString();
    default: 
  		return day + ' ' + monthNames[monthIndex] + ' ' + year;
  }
}

function findStart(data, type){
		switch(type){
			case 'month':
				const monthStart = data.reduce((a, e) => Math.min(a, e.month), Infinity);
				return new Date(monthStart)
			case 'year':
				const yearStart = data.reduce((a, e) => Math.min(a, e.year), Infinity);
				return new Date(yearStart)
			default:
				const dayStart = data.reduce((a, e) => Math.min(a, e.day), Infinity);
				return new Date(dayStart)
		}
}

class HistoryChart extends Component {

	constructor(props){
    super(props);
    this.formatData = this.formatData.bind(this);
    this.filterData = this.filterData.bind(this);
    this.groupDayData = this.groupDayData.bind(this);
  }

	formatData(raw){
		// pulls out only the relevant data for HistoryChart
		const nonPseudo = raw.filter((session) => !session.pseudo);
		const structured = nonPseudo.map(({ daytime, condition, _spot, pseudo }) => { 
			if(daytime){
				const date = new Date(Date.parse(daytime));
				const day = date.getDate();
				const month = date.getMonth();
				const year = date.getFullYear();
			return {date: date, day: new Date(year, month, day), month: new Date(year, month, 1), year: new Date(year, 0, 1), spot: _spot, rating: condition.rating, pseudo: pseudo };
			}
		return {date: null, spot: _spot, rating: condition.rating, pseudo: pseudo } 
		});

		return this.filterData(structured);
	}

	filterData(structured){
		// filters sessions based on ratingFilter and spotsFilter state


		//need to figure out filter in array and filter in range.
		const filtered = structured.filter((session) => { 
			return ( (this.props.spotFilterVal ? this.props.spotFilterVal.length>0 ? this.props.spotFilterVal.includes(session.spot) : true : true) && ( this.props.rangeFilterVal.min ? (session.rating >= this.props.rangeFilterVal.min) : true) && ( this.props.rangeFilterVal.max ? (session.rating <= this.props.rangeFilterVal.max): true ) )
		});

		const dateRange = getDates(findStart(structured, this.props.timeGrouping), new Date(), this.props.timeGrouping)

		return this.groupDayData(filtered, this.props.timeGrouping, dateRange);
	}

	 groupDayData(filtered, timeGroup, dateRange){
			//case for different options based on grouping state
			switch(this.props.dataGrouping){
				case 'count':
					const groupedCount = filtered.reduce((obj, session) => {
							if(!obj[session[timeGroup]]){
								obj[session[timeGroup]] = 0;
							}
							obj[session[timeGroup]] ++
							return obj
						}, {});
					
					var counts = [];
					dateRange.map(e => counts.push({time:formatDate(e, timeGroup), val:groupedCount[e]?groupedCount[e]:null}))

					return counts;

				case 'min':
						const groupedMin = filtered.reduce((obj, session) => {
							if(!obj[session[timeGroup]]){
								obj[session[timeGroup]] = session.rating;
							}else{
								obj[session[timeGroup]] = Math.min(obj[session[timeGroup]], session.rating);
							}
							return obj
						}, {});

					var minimums = [];
					dateRange.map(e => minimums.push({time:formatDate(e, timeGroup), val:groupedMin[e]?groupedMin[e]:null}))

					return minimums;

				case 'max':
						const groupedMax = filtered.reduce((obj, session) => {
							if(!obj[session[timeGroup]]){
								obj[session[timeGroup]] = session.rating
							}else{
								obj[session[timeGroup]] = Math.max(obj[session[timeGroup]], session.rating);
							}
							return obj;
						}, {});
					
					var maximums = [];
					dateRange.map(e => maximums.push({time:formatDate(e, timeGroup), val:groupedMax[e]?groupedMax[e]:null}))

					return maximums;

				default :
						const grouped = filtered.reduce((obj, session) => {
							if(!obj[session[timeGroup]]){
								obj[session[timeGroup]] = {count: 0, sum: 0}
							}
							obj[session[timeGroup]].sum = obj[session[timeGroup]].sum + session.rating;;
							obj[session[timeGroup]].count ++;
							return obj;
						}, {});

					var averages = [];
					dateRange.map(e => averages.push({time:formatDate(e, timeGroup), val:grouped[e]?grouped[e].sum/grouped[e].count:null}))

					return averages;
				}
		}

	render() {

		if(this.props.sessionData.length > 0){

		return (
			<div>
					<div className="valign-wrapper">
						<VictoryChart domainPadding={{x: [1, 100]}} theme={VictoryTheme.material} height={150}>
							<VictoryAxis
								theme={VictoryTheme.material}
								scale="time"
								style={{grid: {stroke: "none"}}}
								tickLabelComponent={<VictoryLabel angle={0} style={{fontSize:'6px'}}/>}
			        />
			        <VictoryAxis
								theme={VictoryTheme.material}
								dependentAxis
								style={{grid: {stroke: "none"}}}
								domain={{y: [0, 10]}}
								tickValues={[0, 20, 40, 60, 80, 100]}
								tickLabelComponent={<VictoryLabel angle={0} style={{fontSize:'6px'}}/>}
			        />
								<VictoryBar
									height={150}
									animate={{ onExit: {duration: 400 }, onEnter: {duration: 750}}}
									barRatio={0.8}
									data={this.formatData(this.props.sessionData)}
									style={{ data: { fill:(d) => d.val >= 3 ? "#ff9800" : "#0097a7", opacity: 1 } }}
									sortKey='time'
									x='time'
									y={(d) => d.val}
								/>
						</VictoryChart>
					</div>
			</div>
		)} else {
			return null;
		}
	}
}

export default HistoryChart


