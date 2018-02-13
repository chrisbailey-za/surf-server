import React, { Component } from "react";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryLabel } from 'victory';


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
		const structured = nonPseudo.map(({ daytime, condition, _spot, pseudo }) => { return {date: daytime, day: daytime?daytime.substring(0,10):null, month: daytime?daytime.substring(0,7):null, year: daytime?daytime.substring(0,4):null, spot: _spot, rating: condition.rating, pseudo: pseudo }});

		return this.filterData(structured);
	}

	filterData(structured){
		// filters sessions based on ratingFilter and spotsFilter state


		//need to figure out filter in array and filter in range.
		const filtered = structured.filter((session) => { 
			return ( (this.props.spotFilterVal ? this.props.spotFilterVal.length>0 ? this.props.spotFilterVal.includes(session.spot) : true : true) && ( this.props.rangeFilterVal.min ? (session.rating >= this.props.rangeFilterVal.min) : true) && ( this.props.rangeFilterVal.max ? (session.rating <= this.props.rangeFilterVal.max): true ) )
		});

		return this.groupDayData(filtered, this.props.timeGrouping);
	}

	 groupDayData(filtered, timeGroup){
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
					Object.keys(groupedCount).forEach((e) => counts.push({time:e, val:groupedCount[e]}))

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
					Object.keys(groupedMin).forEach((e) => minimums.push({time:e, val:groupedMin[e]}))

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
					Object.keys(groupedMax).forEach((e) => maximums.push({time:e, val:groupedMax[e]}))

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
					Object.keys(grouped).forEach((e) => averages.push({time:e, val: (grouped[e].sum / grouped[e].count)}))

					return averages;
				}
		}

	render() {

		if(this.props.sessionData.length > 0){

		return (
			<div>
					<div className="valign-wrapper">
						<VictoryChart domainPadding={{x: 5}} theme={VictoryTheme.material} height={150}>
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
									barRatio={0.4} 
									data={this.formatData(this.props.sessionData)}
									//style={{ data: { fill:(d) => d.rating >= 80 ? "#ff9800" : "#0097a7", opacity: 1 } }}
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


