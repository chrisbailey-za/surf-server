import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSpots, fetchSessions } from '../../actions';
import { Rating } from 'material-ui-rating';
import _ from 'lodash';

class SpotList extends Component {

	componentDidMount(){
		this.props.fetchSpots();
		this.props.fetchSessions();
	}

	countSessions(spotId){
		return this.props.sessions.filter(({_spot, pseudo}) => _spot === spotId && pseudo === false).length;
	}

	averageSessions(spotId){
		var sessions = this.props.sessions.filter(({_spot, pseudo}) => _spot === spotId && pseudo === false);
		if(sessions.length){
			return Math.round(_.meanBy(sessions, function(o) { return o.condition.rating; }));
		} else {
			return 'n/a';
		}
	}

	renderSpots(){
		return this.props.spots.map(({ spotName, quality, notification, _id }) => {
			return(
					<div className="row valign-wrapper card grey lighten-3" style={{paddingTop:'1%', paddingBottom:'1%'}} key={spotName}>					
				  	<div className="col s4 m2 ">
				  		<div className="flow-text center">{spotName}</div>
				  	</div>
				  	<div className="col m2 hide-on-small-only">
				  		<div className="flow-text center"><Rating value={quality} itemStyle={{width: 20, height:20, padding: 0}} /></div>
				  	</div>
				  	<div className="col s2 ">
				  		<div className="flow-text center">{this.countSessions(_id)}</div>
				  	</div>
				  	<div className="col s2 " style={{backgroundColor: 'rgba(255, 152, 0, 0.'+this.averageSessions(_id)+')'}}>
				  		<div className="flow-text center">{this.averageSessions(_id)}</div>
				  	</div>
				  	<div className="col s2 ">
				  		<Link to="/notifications" style={{width: '100%', color:'#00838f'}}>
				  			<div className="flow-text center">{notification?'On':'Off'}</div>
				  		</Link>
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
				  	<div className="col s4 m2 ">
				  		<div className="flow-text show-on-small-only hide-on-med-and-up">Spot</div>
							<div className="flow-text hide-on-small-only">Spot Name</div>
				  	</div>
				  	<div className="col m2 hide-on-small-only">
							<div className="flow-text center">Quality</div>				  	
						</div>
						<div className="col s2 ">
							<div className="flow-text show-on-small-only hide-on-med-and-up">Surfs</div>
							<div className="flow-text hide-on-small-only">No. of Session</div>
						</div>
						<div className="col s2 ">
							<div className="flow-text show-on-small-only hide-on-med-and-up">Ave</div>
							<div className="flow-text hide-on-small-only">Average Rating</div>
						</div>
						<div className="col s2 ">
							<div className="flow-text show-on-small-only hide-on-med-and-up"><i className="material-icons white-text" style={{verticalAlign:'text-bottom', paddingLeft:'5px'}}>notifications</i></div>
							<div className="flow-text hide-on-small-only">Notifications</div>
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

function mapStateToProps({ spots, sessions }){
	return { spots, sessions };
}

export default connect( mapStateToProps, {fetchSpots, fetchSessions} )(SpotList);


