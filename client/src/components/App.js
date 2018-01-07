import React, { Component } from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Header from './header/Header';
import Landing from './Landing';
import Dashboard from './dashboard/Dashboard';
import SurfNew from './addSession/SurfNew';
import SpotNew from './addSpot/SpotNew';
import NotificationPage from './notifications/NotificationPage';
import HistoryPage from './sessionHistory/HistoryPage';
import SpotConfirmation from './spotConfirmation/SpotConfirmation';
import MySpotPage from './mySpots/mySpotPage'

class App extends Component {
	componentDidMount() {
		this.props.fetchUser();
	}

	render() {
		return(
			<div>
				<BrowserRouter>
					<MuiThemeProvider>
						<div>
							<Header />
							<div className="container">
								<Route exact path="/" component={Landing} />
								<Route exact path="/home" component={Dashboard} />
								<Route exact path="/session/add" component={SurfNew} />
								<Route exact path="/spot/add" component={SpotNew} />
								<Route exact path="/spot/confirmation" component={SpotConfirmation} />
								<Route exact path="/notifications" component={NotificationPage} />
								<Route exact path="/session/logs" component={HistoryPage} />
								<Route exact path="/spot/list" component={MySpotPage} />
							</div>
						</div>
					</MuiThemeProvider>
				</BrowserRouter>
			</div>
			);
	}
}

export default connect(null, actions)(App);