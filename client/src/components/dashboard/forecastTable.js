import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchSpots, fetchForecast } from '../../actions';
import { Toggle } from "material-ui";
import ArrowComp from './ArrowComp';
import Picker from 'react-picker-mb';
import ForecastSelector from './ForecastSelector';

class ForecastTable extends Component {

	state = {};

	constructor(props){
    super(props);
    this.updateFunc = this.updateFunc.bind(this);
    this.setEvery = this.setEvery.bind(this);
    this.setEveryMobile = this.setEveryMobile.bind(this);
  }

	componentDidMount(){
		this.props.fetchSpots();
		this.props.fetchForecast('848');
		this.setState({showEvery:2, hideNights:true, hideSecondary: true, location:848})
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

	updateFunc(payload){
		this.setState({location:payload});
		this.props.fetchForecast(payload);
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

	setEveryMobile(val){
		this.setState({showEvery:val[0]})
	}

	modifyArr(arr){
		let newArr = arr.filter((_,i) => i % this.state.showEvery === 0);
		if(this.state.hideNights){
			newArr = newArr.filter((entry) => new Date(entry.dayTime*1000).getHours() >= 5 && new Date(entry.dayTime*1000).getHours() <= 21);
		}
		return newArr;
	}

	percentageToHsl(percentage, hue0, hue1) {
    var hue = (percentage * (hue1 - hue0)) + hue0;
    var perc = (1 - percentage)*50 + 50;
    return 'hsl(' + hue + ', 100%, ' + perc + '%)';
	}

	percentageToHslFixed(percentage, hue0, hue1) {
    var hue = (percentage * (hue1 - hue0)) + hue0;
    return 'hsl(' + hue + ', 100%, 80%)';
	}

	percentageToHslWind(percentage, hue0, hue1) {
		var hue = ''
		if (percentage > 0.666666){
    	hue = (percentage * (0 - 270)) + 270;
    }else{
    	hue = (percentage * (0 - 180)) + 180;
    }
    return 'hsl(' + hue + ', 100%, 80%)';
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
						<div className="col s12">2nd Swell Energy</div>				  	
					</div>
					<div className="row valign-wrapper" style={{marginBottom:'0px', padding: '4px 0 1px 0'}}>
						<div className="col s12">2nd Swell Dir</div>
					</div>
			</div>
		)
	}

	renderSecondary(secondarySize, secondaryPeriod, secondaryEnergy, secondaryDirection){
		return(
			<div>
				<div className="row valign-wrapper" style={{marginBottom:'0px', paddingTop:'3px', border:'lightgrey', borderStyle: 'solid', borderWidth:'1px', backgroundColor:this.percentageToHsl(secondarySize/10, 210, 250)}}>
					<div className="col" style={{width: '35px', height:'22px', overflow:'hidden'}}>{secondarySize.toFixed(1)}</div>
				</div>
				<div className="row valign-wrapper" style={{marginBottom:'0px', paddingTop:'3px', border:'lightgrey', borderStyle: 'solid', borderWidth:'1px', backgroundColor:this.percentageToHsl((secondaryPeriod - 5)/20, 45, 90)}}>
					<div className="col" style={{width: '35px', height:'22px', overflow:'hidden'}}>{secondaryPeriod.toFixed(0)}</div>
				</div>
				<div className="row valign-wrapper" style={{marginBottom:'0px', paddingTop:'3px', border:'lightgrey', borderStyle: 'solid', borderWidth:'1px', backgroundColor:this.percentageToHsl(secondaryEnergy/400, 45, 0)}}>
					<div className="col" style={{width: '35px', height:'22px', overflow:'hidden'}}>{secondaryEnergy.toFixed(0)}</div>
				</div>
				<div className="row valign-wrapper" style={{marginBottom:'0px', paddingTop:'3px', border:'lightgrey', borderStyle: 'solid', borderWidth:'1px'}}>
					<div className="col" style={{width: '35px', height:'22px', overflow:'hidden'}}><ArrowComp value={secondaryDirection} /></div>
				</div>
			</div>
		)
	}

	renderForecast(){
		const initialArr = this.modifyArr(this.props.forecast)

		return initialArr.map(({ dayTime, primarySwellSize,primarySwellEnergy, primarySwellDirection, primarySwellPeriod, secondarySwellSize, secondarySwellEnergy, secondarySwellDirection, secondarySwellPeriod, windSpeed, windDirection, tide}) => {
			return(
					<div className='col' key={dayTime} style={{textAlign:'center', cursor:'move'}}>
							<div className="row valign-wrapper" style={{marginBottom:'0px', paddingTop:'3px', border:'lightgrey', borderStyle: 'solid', borderWidth:'1px', backgroundColor: 'lightgrey'}}>
					  		<div className="col" style={{width: '35px', height:'22px', overflow:'hidden'}}>{this.getWeekday(new Date(dayTime*1000).getDay())}</div>
					  	</div>
					  	<div className="row valign-wrapper" style={{marginBottom:'0px', paddingTop:'3px', border:'lightgrey', borderStyle: 'solid', borderWidth:'1px', backgroundColor: 'lightgrey'}}>
					  		<div className="col" style={{width: '35px', height:'22px', overflow:'hidden'}}>{new Date(dayTime*1000).getDate()}</div>
					  	</div>
					  	<div className="row valign-wrapper" style={{marginBottom:'0px', paddingTop:'3px', border:'lightgrey', borderStyle: 'solid', borderWidth:'1px', backgroundColor: 'lightgrey'}}>
					  		<div className="col" style={{width: '35px', height:'22px', overflow:'hidden'}}>{this.makeHour(new Date(dayTime*1000).getHours())}</div>
					  	</div>
							<div className="row valign-wrapper" style={{marginBottom:'0px', paddingTop:'3px', border:'lightgrey', borderStyle: 'solid', borderWidth:'1px', backgroundColor:this.percentageToHsl(primarySwellSize/10, 210, 250)}}>
					  		<div className="col" style={{width: '35px', height:'22px', overflow:'hidden'}}>{primarySwellSize.toFixed(1)}</div>
					  	</div>
							<div className="row valign-wrapper" style={{marginBottom:'0px', paddingTop:'3px', border:'lightgrey', borderStyle: 'solid', borderWidth:'1px', backgroundColor:this.percentageToHsl((primarySwellPeriod-5)/20, 45, 90)}}>
								<div className="col" style={{width: '35px', height:'22px', overflow:'hidden'}}>{primarySwellPeriod.toFixed(0)}</div>				  	
							</div>
							<div className="row valign-wrapper" style={{marginBottom:'0px', paddingTop:'3px', border:'lightgrey', borderStyle: 'solid', borderWidth:'1px', backgroundColor:this.percentageToHsl(primarySwellEnergy/400, 45, 0)}}>
								<div className="col" style={{width: '35px', height:'22px', overflow:'hidden'}}>{primarySwellEnergy.toFixed(0)}</div>				  	
							</div>
							<div className="row valign-wrapper" style={{marginBottom:'0px', paddingTop:'3px', border:'lightgrey', borderStyle: 'solid', borderWidth:'1px'}}>
								<div className="col" style={{width: '35px', height:'22px', overflow:'hidden'}}><ArrowComp value={primarySwellDirection} /></div>
							</div>
							{!this.state.hideSecondary?this.renderSecondary(secondarySwellSize, secondarySwellPeriod, secondarySwellEnergy, secondarySwellDirection):null}
							<div className="row valign-wrapper" style={{marginBottom:'0px', paddingTop:'3px', border:'lightgrey', borderStyle: 'solid', borderWidth:'1px', backgroundColor:this.percentageToHslWind(windSpeed/70, 180, 0)}}>
								<div className="col" style={{width: '35px', height:'22px', overflow:'hidden'}}>{windSpeed.toFixed(0)}</div>
							</div>
							<div className="row valign-wrapper" style={{marginBottom:'0px', paddingTop:'3px', border:'lightgrey', borderStyle: 'solid', borderWidth:'1px'}}>
								<div className="col" style={{width: '35px', height:'22px', overflow:'hidden'}}><ArrowComp value={windDirection} /></div>
							</div>
							<div className="row valign-wrapper" style={{marginBottom:'0px', paddingTop:'3px', border:'lightgrey', borderStyle: 'solid', borderWidth:'1px', backgroundColor:this.percentageToHsl(tide/2.5, 280, 240)}}>
								<div className="col" style={{width: '35px', height:'22px', overflow:'hidden'}}>{tide.toFixed(2)}</div>			  	
							</div>
					</div>
			)
		});
	 }

	render() {
		return (
			<div style={{paddingTop: '3%'}}>
				<h3 className="cyan lighten-5" style={{padding:'5%'}}>Best Spots</h3>
				<ForecastSelector label="Forecast For" updateFunc={this.updateFunc} location={this.state.location}/>
				<div className="row">
					<div className="col s4 flow-text">
						<div className="row" style={{margin:'0px'}}>				
							<label>Hour Interval</label>
						</div>
						<div className="row hide-on-small-only">		
							<a className={this.state.showEvery===1?"btn-flat white-text cyan darken-2":"btn-flat white-text grey lighten-1"} style={{padding:'0 1.5rem'}} onClick={() => this.setEvery(1)}>1</a>
							<a className={this.state.showEvery===2?"btn-flat white-text cyan darken-2":"btn-flat white-text grey lighten-1"} style={{padding:'0 1.5rem'}} onClick={() => this.setEvery(2)}>2</a>
							<a className={this.state.showEvery===3?"btn-flat white-text cyan darken-2":"btn-flat white-text grey lighten-1"} style={{padding:'0 1.5rem'}} onClick={() => this.setEvery(3)}>3</a>
							<a className={this.state.showEvery===6?"btn-flat white-text cyan darken-2":"btn-flat white-text grey lighten-1"} style={{padding:'0 1.5rem'}} onClick={() => this.setEvery(6)}>6</a>
						</div>
						<div className="row show-on-small hide-on-med-and-up" style={{paddingTop:'10px'}}>	
							<Picker
								onChange={this.setEveryMobile}
								pickerSlots={[{options:[1, 2, 3, 6], defaultIndex: 1, className: 'mobilePicker'}]}
								visibleItemCount={3}
								rotateEffect={true}
								itemHeight={20}
							/>
						</div>
					</div>
					<div className="col s4 flow-text">
						<label>Show Nights</label>
						<Toggle onToggle={( blank, val) => this.toggleNights(val)} thumbSwitchedStyle={{backgroundColor:'#0097a7'}}/>
					</div>
					<div className="col s4 flow-text">
						<label>Show Secondary Swell</label>
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
								<div className="col s12">Swell Energy</div>				  	
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
					<div className="fixed-action-btn">
				    <Link to="/session/add" className="btn-floating btn-large orange">
				      <i className="large material-icons">add</i>
				    </Link>
			    </div>
				</div>
					<div style={this.state.hideSecondary?{marginTop:'330px', position:'relative'}:{marginTop:'430px', position:'relative'}}>
					</div>
					<div className="cyan darken-2" style={{height:'50px', position:'relative'}}>
						<span className="white-text">footer content</span>
					</div>
			</div>
		);
	}
}

function mapStateToProps({ spots, forecast }){
	return { spots, forecast };
}

export default connect( mapStateToProps, {fetchSpots, fetchForecast} )(ForecastTable);


