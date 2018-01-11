import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import ForecastTable from './forecastTable';

class Dashboard extends Component {

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
				<ForecastTable />
			);
		}
	}

	render(){
		return(
			<div>
				{this.renderContent()}
			</div>
	)};
};

function mapStateToProps({ auth }) {
	return { auth };
}

export default connect( mapStateToProps)(Dashboard)