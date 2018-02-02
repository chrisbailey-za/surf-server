import React, { Component } from "react";
import { connect } from 'react-redux';
import { CircleLoader } from 'react-spinners';
import BestTable from './BestTable'

class BestSpots extends Component {

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
				<BestTable ratings={this.props.ratings} spots={this.props.spots} />
			);

		}
	}
}

function mapStateToProps({ spots, ratings, loadingRating }){
	return { spots, ratings, loadingRating };
}

export default connect( mapStateToProps )(BestSpots);


