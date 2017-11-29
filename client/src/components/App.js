import React, { Component } from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Header from './header/Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurfNew from './addSession/SurfNew';
import SpotNew from './addSpot/SpotNew';

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
								<Route exact path="/surf/add" component={SurfNew} />
								<Route exact path="/spot/add" component={SpotNew} />
							</div>
						</div>
					</MuiThemeProvider>
				</BrowserRouter>
			</div>
			);
	}
}

export default connect(null, actions)(App);