import React, { Component } from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
const SurveyNew = () => <h2>Survey New</h2>;

class App extends Component {
	componentDidMount() {
		this.props.fetchUser();
	}

	render() {
		return(
			<div>
				<BrowserRouter>
					<div>
						<Header />
						<div className="container">
							<Route exact path="/" component={Landing} />
							<Route exact path="/home" component={Dashboard} />
							<Route exact path="/surf/add" component={SurveyNew} />
						</div>
					</div>
				</BrowserRouter>
			</div>
			);
	}
}

export default connect(null, actions)(App);