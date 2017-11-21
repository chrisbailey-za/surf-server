import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SideNavComponent from './SideNavComponent'

class Header extends Component {
	renderContent() {
		switch (this.props.auth) {
			case null:
				return;
			case false:
				return (
				<ul className="right">
					<li>
						<a href="/">How it Works</a>
					</li>
					<li>
						<a href="">Ts & Cs</a>
					</li>
					<li>
						<a href="/auth/google">Login</a>
					</li>
				</ul>
				);
			default:
				return (
					<div>
						<SideNavComponent />
						<ul className="right">
							<li>
								<a href="/api/logout">Logout</a>
							</li>
						</ul>
					</div>
					);
		}
	}

	render() {
		return (
			<nav className="cyan darken-2">
				<div className="container">
					<div className="nav-wrapper">					
							{this.renderContent()}
					</div>
				</div>
			</nav>
		);
	}
}

function mapStateToProps({ auth }) {
	return { auth };
}

export default connect(mapStateToProps)(Header);
