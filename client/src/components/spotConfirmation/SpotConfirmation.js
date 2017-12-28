import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

class SpotConfirmation extends Component {

	state = {};

	renderContent() {
	switch (this.props.auth) {
		case null:
			return;
		case false:
			return(
		 		<Redirect to='/'/>
			);
		default:
			return( 
				<div style={{paddingTop: '5%'}}>
						<div className="row valign-wrapper">
							<div className="col flow-text s12 m12 flow-text card center orange lighten-4 black-text" style={{paddingTop:'3%', paddingBottom:'3%'}}>
			  				<div className='row'>
			  					<span >Awesome, you just added {!this.props.location.state?'a new spot':this.props.location.state.spot}!! </span><br></br>
			  				</div>
			  				<div className='row'>
			  					<i className="medium material-icons orange-text text-lighten-2">place</i>
			  					<i className="large material-icons cyan-text text-darken-3">add_location</i>
			  					<i className="medium material-icons orange-text text-lighten-2">place</i>
			  				</div>
			  			</div>
			  		</div>
			  		<div className="row valign-wrapper">
				  		<div className="col s6">
					  		<Link to="/session/add">
									<button className="orange btn-large flow-text black-text hide-on-small-only" style={{margin:'auto auto 50px auto', width:'80%', minHeight:'54px', height:'auto', lineHeight: '22px'}}>Add Surf for this Spot
										<i className="material-icons right">add_circle</i>
									</button>
									<button className="orange btn-large flow-text black-text hide-on-med-and-up" style={{margin:'auto auto 50px auto', width:'100%', minHeight:'120px', height:'auto', lineHeight: '22px'}}>Add Surf for this Spot
										<br></br>
										<i className="material-icons center">add_circle</i>
									</button>
								</Link>
							</div>
							<div className="col s6">
								<Link to="/spot/add">
									<button className="cyan flow-text darken-1 right btn-large white-text hide-on-small-only" style={{margin:'auto auto 50px auto', width:'80%', minHeight:'54px', height:'auto', lineHeight: '22px'}}>Add Another Spot
										<i className="material-icons right">place</i>
									</button>
									<button className="cyan flow-text darken-1 right btn-large white-text hide-on-med-and-up" style={{margin:'auto auto 50px auto', width:'100%', minHeight:'120px', height:'auto', lineHeight: '22px'}}>Add Another Spot
										<br></br>
										<i className="material-icons center">place</i>
									</button>
								</Link>
							</div>
						</div>
				</div>
			)
		}
	}

	render(){
		return(
			<div>
				{this.renderContent()}
			</div>
	)};
};

function mapStateToProps({ auth, spot }) {
	return { auth, spot };
}

export default connect(mapStateToProps)(SpotConfirmation);