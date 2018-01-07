import React, { Component } from "react";
import { connect } from 'react-redux';
import { fetchSpots, fetchForecast } from '../../actions';
import { Toggle } from "material-ui";

class ForecastTable extends Component {

	state = {};

	componentDidMount(){
		this.props.fetchSpots();
		this.props.fetchForecast('848');
		this.setState({showEvery:3, hideNights:true, hideSecondary: true})
	}

	getWeekday(n){
		const weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
		return weekday[n];
	}

	makeHour(n){
		if(n < 10){
			return '0'+n+'h' 
		}else{
			return n+'h'
		}
	}

	toggleNights(val){
		this.setState({hideNights:!val})
	}

	toggleSecSwell(val){
		this.setState({hideSecondary:!val})
	}

	setEvery(val){
		this.setState({showEvery:val})
	}

	modifyArr(arr){
		let newArr = arr.filter((_,i) => i % this.state.showEvery === 0);
		if(this.state.hideNights){
			newArr = newArr.filter((entry) => new Date(entry.dayTime*1000).getHours() >= 5 && new Date(entry.dayTime*1000).getHours() <= 21);
		}
		return newArr;
	}

	renderSecondaryList(){
		return(
			<div>
			  	<div className="row valign-wrapper" style={{marginBottom:'0px', padding: '4px 0 1px 0'}}>
			  		<div className="col s12">2nd Swell Size</div>
			  	</div>
			  	<div className="row valign-wrapper" style={{marginBottom:'0px', padding: '4px 0 1px 0'}}>
						<div className="col s12">2nd Swell Period</div>				  	
					</div>
					<div className="row valign-wrapper" style={{marginBottom:'0px', padding: '4px 0 1px 0'}}>
						<div className="col s12">2nd Swell Dir</div>
					</div>
			</div>
		)
	}

	renderSecondary(secondarySize, secondaryPeriod, secondaryDirection){
		return(
			<div>
				<div className="row valign-wrapper" style={{marginBottom:'0px', paddingTop:'3px', border:'lightgrey', borderStyle: 'solid', borderWidth:'1px'}}>
					<div className="col" style={{width: '35px', height:'22px', overflow:'hidden'}}>{secondarySize}</div>
				</div>
				<div className="row valign-wrapper" style={{marginBottom:'0px', paddingTop:'3px', border:'lightgrey', borderStyle: 'solid', borderWidth:'1px'}}>
					<div className="col" style={{width: '35px', height:'22px', overflow:'hidden'}}>{secondaryPeriod}</div>
				</div>
				<div className="row valign-wrapper" style={{marginBottom:'0px', paddingTop:'3px', border:'lightgrey', borderStyle: 'solid', borderWidth:'1px'}}>
					<div className="col" style={{width: '35px', height:'22px', overflow:'hidden'}}>{secondaryDirection}</div>
				</div>
			</div>
		)
	}

	renderForecast(){
		const initialArr = this.modifyArr(this.props.forecast)

		return initialArr.map(({ dayTime, primarySwellSize, primarySwellDirection, primarySwellPeriod, secondarySwellSize, secondarySwellDirection, secondarySwellPeriod, windSpeed, windDirection, tide}) => {
			return(
					<div className='col' key={dayTime} style={{textAlign:'center', cursor:'move'}}>
							<div className="row valign-wrapper" style={{marginBottom:'0px', paddingTop:'3px', border:'lightgrey', borderStyle: 'solid', borderWidth:'1px'}}>
					  		<div className="col" style={{width: '35px', height:'22px', overflow:'hidden'}}>{this.getWeekday(new Date(dayTime*1000).getDay())}</div>
					  	</div>
					  	<div className="row valign-wrapper" style={{marginBottom:'0px', paddingTop:'3px', border:'lightgrey', borderStyle: 'solid', borderWidth:'1px'}}>
					  		<div className="col" style={{width: '35px', height:'22px', overflow:'hidden'}}>{new Date(dayTime*1000).getDate()}</div>
					  	</div>
					  	<div className="row valign-wrapper" style={{marginBottom:'0px', paddingTop:'3px', border:'lightgrey', borderStyle: 'solid', borderWidth:'1px'}}>
					  		<div className="col" style={{width: '35px', height:'22px', overflow:'hidden'}}>{this.makeHour(new Date(dayTime*1000).getHours())}</div>
					  	</div>
							<div className="row valign-wrapper" style={{marginBottom:'0px', paddingTop:'3px', border:'lightgrey', borderStyle: 'solid', borderWidth:'1px'}}>
					  		<div className="col" style={{width: '35px', height:'22px', overflow:'hidden'}}>{primarySwellSize.toFixed(1)}</div>
					  	</div>
							<div className="row valign-wrapper" style={{marginBottom:'0px', paddingTop:'3px', border:'lightgrey', borderStyle: 'solid', borderWidth:'1px'}}>
								<div className="col" style={{width: '35px', height:'22px', overflow:'hidden'}}>{primarySwellPeriod.toFixed(0)}</div>				  	
							</div>
							<div className="row valign-wrapper" style={{marginBottom:'0px', paddingTop:'3px', border:'lightgrey', borderStyle: 'solid', borderWidth:'1px'}}>
								<div className="col" style={{width: '35px', height:'22px', overflow:'hidden'}}>{primarySwellDirection}</div>
							</div>
							{!this.state.hideSecondary?this.renderSecondary(secondarySwellSize, secondarySwellPeriod, secondarySwellDirection):null}
							<div className="row valign-wrapper" style={{marginBottom:'0px', paddingTop:'3px', border:'lightgrey', borderStyle: 'solid', borderWidth:'1px'}}>
								<div className="col" style={{width: '35px', height:'22px', overflow:'hidden'}}>{windSpeed.toFixed(0)}</div>
							</div>
							<div className="row valign-wrapper" style={{marginBottom:'0px', paddingTop:'3px', border:'lightgrey', borderStyle: 'solid', borderWidth:'1px'}}>
								<div className="col" style={{width: '35px', height:'22px', overflow:'hidden'}}>{windDirection}</div>
							</div>
							<div className="row valign-wrapper" style={{marginBottom:'0px', paddingTop:'3px', border:'lightgrey', borderStyle: 'solid', borderWidth:'1px'}}>
								<div className="col" style={{width: '35px', height:'22px', overflow:'hidden'}}>{tide.toFixed(2)}</div>			  	
							</div>
					</div>
			)
		});
	 }

	render() {
		return (
			<div style={{paddingTop: '3%'}}>
				<div className="row">
					<div className="col s4">
						<div className="row" style={{margin:'0px'}}>				
							Hour Interval
						</div>
						<div className="row">		
							<a className={this.state.showEvery===1?"btn-flat white-text cyan darken-2":"btn-flat white-text grey lighten-1"} style={{padding:'0 1.5rem'}} onClick={() => this.setEvery(1)}>1</a>
							<a className={this.state.showEvery===2?"btn-flat white-text cyan darken-2":"btn-flat white-text grey lighten-1"} style={{padding:'0 1.5rem'}} onClick={() => this.setEvery(2)}>2</a>
							<a className={this.state.showEvery===3?"btn-flat white-text cyan darken-2":"btn-flat white-text grey lighten-1"} style={{padding:'0 1.5rem'}} onClick={() => this.setEvery(3)}>3</a>
							<a className={this.state.showEvery===6?"btn-flat white-text cyan darken-2":"btn-flat white-text grey lighten-1"} style={{padding:'0 1.5rem'}} onClick={() => this.setEvery(6)}>6</a>
						</div>
					</div>
					<div className="col s4">
						Show Nights
						<Toggle onToggle={( blank, val) => this.toggleNights(val)} thumbSwitchedStyle={{backgroundColor:'#0097a7'}}/>
					</div>
					<div className="col s4">
						Show Secondary Swell
						<Toggle onToggle={( blank, val) => this.toggleSecSwell(val)} thumbSwitchedStyle={{backgroundColor:'#0097a7'}}/>
					</div>
				</div>
				<div className="row" style={{overflowX:'scroll', position:'absolute', left:'0'}}>
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
								<div className="col s12">Swell Direction</div>
							</div>
								{!this.state.hideSecondary?this.renderSecondaryList():null}
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
					<div className="col" style={window.innerWidth>600?{width:'80vw', marginTop: '0.5rem', marginBottom:'1rem', overflowX:'scroll', display:'flex', fontSize:'10px'}:{width:'98vw', paddingTop:'1%', margin: '0.5rem 1vw', marginBottom:'1rem', overflowX:'scroll', display:'flex', fontSize:'10px'}}>
						{this.renderForecast()}
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps({ spots, forecast }){
	return { spots, forecast };
}

export default connect( mapStateToProps, {fetchSpots, fetchForecast} )(ForecastTable);


