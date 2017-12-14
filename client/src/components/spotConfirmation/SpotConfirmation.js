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
			  					<i class="medium material-icons orange-text text-lighten-2">place</i>
			  					<i class="large material-icons cyan-text text-darken-3">add_location</i>
			  					<i class="medium material-icons orange-text text-lighten-2">place</i>
			  				</div>
			  			</div>
			  		</div>
			  		<div className="row valign-wrapper">
				  		<div className="col s6">
					  		<Link to="/session/add">
									<button className="orange btn-large flow-text black-text" style={{paddingLeft:'10%', paddingRight:'10%', height:'auto', minHeight: '60px', lineHeight: '20px', textAlign:'left'}}>Add Surf for this Spot
										<i className="material-icons right">add_circle</i>
									</button>
								</Link>
							</div>
							<div className="col s6">
								<Link to="/spot/add">
									<button className="cyan flow-text darken-1 right btn-large white-text" style={{paddingLeft:'10%', paddingRight:'10%', height:'auto', minHeight: '60px', lineHeight: '20px', textAlign:'left'}}>Add Another Spot
										<i className="material-icons right">place</i>
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