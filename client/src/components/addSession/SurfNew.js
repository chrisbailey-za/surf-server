import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import SurfForm from './SurfForm'


class SurfNew extends Component {

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
			<SurfForm spots={this.props.auth.spots}/>
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

export default connect(mapStateToProps)(SurfNew);