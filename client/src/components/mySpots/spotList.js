import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSpots } from '../../actions';

class SpotList extends Component {

	componentDidMount(){
		this.props.fetchSpots();
	}

	renderSpots(){
		return this.props.spots.map(({ spotName, quality, notification }) => {
			return(
					<div className="row valign-wrapper card" style={{paddingTop:'1%', paddingBottom:'1%'}}>					
				  	<div className="col s2 ">
				  		<div className="flow-text center">{spotName}</div>
				  	</div>
				  	<div className="col s2 ">
				  		<div className="flow-text center">{quality}</div>
				  	</div>
				  	<div className="col s2 ">
				  		<div className="flow-text center">NUMBER</div>
				  	</div>
				  	<div className="col s2 ">
				  		<div className="flow-text center">NUMBER</div>
				  	</div>
				  	<div className="col s2 ">
				  		<div className="flow-text center">{notification?'On':'Off'}</div>
				  	</div>
				  	<div className="col s2 ">
				  		<div className="flow-text center"><i className="material-icons cyan-text text-darken-3 center">settings</i></div>
				  	</div>
				  </div>
			)
		});
	}

	render() {
		return (
			<div style={{paddingTop: '3%'}}>
				<div className="row valign-wrapper card grey darken-1 white-text" style={{paddingTop:'1%', paddingBottom:'1%', marginBottom:'40px'}}>
				  	<div className="col s2 ">
				  		<div className="flow-text center">Spot Name</div>
				  	</div>
				  	<div className="col s2 ">
							<div className="flow-text center">Quality</div>				  	
						</div>
						<div className="col s2 ">
							<div className="flow-text center">No. of Sessions</div>
						</div>
						<div className="col s2 ">
							<div className="flow-text center">Average Surf</div>
						</div>
						<div className="col s2 ">
							<div className="flow-text center">Notifications</div>
						</div>
						<div className="col s2 ">
							<div className="flow-text center">Edit</div>				  	
						</div>
				</div>
					{this.renderSpots()}
				<div className="valign-wrapper">
					<Link to="/home" style={{width: '100%'}}>
						<button className="orange btn-large black-text" type="submit" style={{display: 'block', margin:'auto auto 50px auto', width:'80%', minHeight:'54px', height:'auto', lineHeight: '22px'}}>Cool Beans, Take me Home
						</button>
					</Link>
				</div>
			</div>
		);
	}
}

function mapStateToProps({ spots }){
	return { spots };
}

export default connect( mapStateToProps, {fetchSpots} )(SpotList);


