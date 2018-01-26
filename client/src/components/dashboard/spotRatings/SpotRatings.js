import React, { Component } from "react";
import { connect } from 'react-redux';
import SpotSelector from './SpotSelector';
import RatingsList from './RatingsList';
import { CircleLoader } from 'react-spinners';

class SpotRatings extends Component {

	state = {};

	constructor(props){
    super(props);
    this.changeSpot = this.changeSpot.bind(this);
  }

  changeSpot(spot){
  	this.setState({currentSpot: spot})
  }


	render() {

		if(this.props.loadingRating){

			return (
				<div className="grey lighten-2" style={{width:'100%', height:'100px', textAlign:'-webkit-center', paddingTop:'10px'}}>
					<div style={{margin:'auto'}}>
						<CircleLoader loading={this.props.loadingRating} color="#0097a7" size={50}/>
					</div>
				</div>
				)

		}else{

			return (
				<div >
					<SpotSelector label="Check the surf for" spots={this.props.spots} changeSpot={this.changeSpot} currentSpot={this.state.currentSpot}/>
					<div className="row" style={window.innerWidth>600?{width:'130%', marginTop: '0.5rem', marginLeft:'-15%', marginBottom:'1rem', overflowX:'scroll', display:'flex', fontSize:'10px'}:{width:'98vw', paddingTop:'1%', margin: '0.5rem 1vw', marginBottom:'1rem', overflowX:'scroll', display:'flex', fontSize:'10px'}}>
						{this.state.currentSpot ? <RatingsList currentSpot={this.state.currentSpot} ratings={this.props.ratings} hideNights={this.props.hideNights}/> : null}
					</div>
				</div>
			);

		}
	}
}

function mapStateToProps({ spots, ratings, loadingRating }){
	return { spots, ratings, loadingRating };
}

export default connect( mapStateToProps )(SpotRatings);


