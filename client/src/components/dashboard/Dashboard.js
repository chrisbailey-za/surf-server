import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import ForecastTable from './ForecastTable';

class Dashboard extends Component {

	state = {}

	renderContent() {
	switch (this.props.auth) {
		case null:
			return;
		case false:
		return(
		 		<Redirect to='/landing'/>
			);
		default:
		return(
			<div>
				<ForecastTable />
			</div>
			);
		}
	}

	sessionAdded(){
			setTimeout(function () {
	      this.setState({startFade:true})
	    }.bind(this), 2000);
			setTimeout(function () {
	      this.setState({addedSession:true})
	    }.bind(this), 4000);
			return(
				<div style={!this.state.addedSession?{display:'none'}:this.state.startFade?{opacity:0, transition: 'all 2s linear'}:{}}>
					<div className='cyan' style={{position: 'absolute', top: '20%', left: '10%', width:'80%', height: '250px', zIndex: '1000', textAlign: '-webkit-center'}}>
						<div style={{margin:'auto'}}>
							<h3> Thanks for adding a Session </h3>
						</div>
					</div>
				</div>
			)
	}

	render(){
		return(
			<div>
				{this.sessionAdded()}
				{this.renderContent()}
			</div>
	)};
};

function mapStateToProps({ auth }) {
	return { auth };
}

export default connect( mapStateToProps)(Dashboard)