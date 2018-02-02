import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchSpots, fetchForecast, fetchRatings } from '../../actions';
import { Toggle } from "material-ui";
import Picker from 'react-picker-mb';
import ForecastSelector from './table/ForecastSelector';
import RowLabels from './table/RowLabels';
import ShowEvery from './table/ShowEvery';
import TableLoader from './table/TableLoader';
import SpotRatings from './spotRatings/SpotRatings';
import BestSpots from './bestSpots/BestSpots';

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
		this.props.fetchRatings();
		this.setState({showEvery:2, hideNights:true, hideSecondary: true, location:848})
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

	render() {
		return (
			<div style={{paddingTop: '3%'}}>
				<BestSpots />
				<ForecastSelector label="Forecast For" updateFunc={this.updateFunc} location={this.state.location}/>
				<div className="row">
					<div className="col s4 flow-text">
						<div className="row" style={{margin:'0px'}}>				
							<label>Hour Interval</label>
						</div>
						<ShowEvery showEvery={this.state.showEvery} setEvery={this.setEvery}/>
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
					<RowLabels showSecondary={!this.state.hideSecondary}/>
					<div className="col" style={window.innerWidth>600?{width:'80vw', marginTop: '0.5rem', marginBottom:'1rem', overflowX:'scroll', display:'flex', fontSize:'10px'}:{width:'98vw', paddingTop:'1%', margin: '0.5rem 1vw', marginBottom:'1rem', overflowX:'scroll', display:'flex', fontSize:'10px'}}>
						<TableLoader loading={this.props.loadingForecast} forecast={this.props.forecast} hideNights={this.state.hideNights} showEvery={this.state.showEvery} showSecondary={!this.state.hideSecondary}/>
					</div>
					<div className="fixed-action-btn">
				    <Link to="/session/add" className="btn-floating btn-large orange">
				      <i className="large material-icons">add</i>
				    </Link>
			    </div>
				</div>
					<div style={this.state.hideSecondary?{marginTop:'330px', position:'relative'}:{marginTop:'430px', position:'relative'}}>
					</div>
						<SpotRatings hideNights={this.state.hideNights}/>
					<div className="cyan darken-2" style={{height:'50px', position:'relative'}}>
						<span className="white-text">footer content</span>
					</div>
			</div>
		);
	}
}

function mapStateToProps({ spots, forecast, loadingForecast, ratings }){
	return { spots, forecast, loadingForecast, ratings };
}

export default connect( mapStateToProps, {fetchSpots, fetchForecast, fetchRatings} )(ForecastTable);


