import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import HistoryChart from './HistoryChart'
import HistoryControls from './HistoryControls';
import { filterSessions, fetchSessions } from '../../actions/index.js'


class logPage extends Component {

	state = {filter: {spots: null, ratings: {min:null, max:null}, timeGrouping: 'day', dataGrouping: 'count'}}

	constructor(props){
    super(props);
    this.setFilterValues = this.setFilterValues.bind(this);
  }

  componentDidMount(){
		this.props.fetchSessions();
	}

	setFilterValues(values, filterType){
		this.props.filterSessions(values, filterType);
	}

	checkSessions(){
		if(this.props.sessions.length>0){
			return(
					<HistoryChart 
					sessionData={this.props.sessions}
					spotFilterVal={this.props.filter.spots}
					timeGrouping={this.props.filter.timeGrouping?this.props.filter.timeGrouping:'day'}
					rangeFilterVal={this.props.filter.ratings}
					dataGrouping={this.props.filter.dataGrouping?this.props.filter.dataGrouping:'count'}/>
				)
		}
		return null
	}


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
			<div>
				<HistoryControls 
					setFilterValues={this.setFilterValues} 
					spotFilterVal={this.props.filter.spots}
					timeGrouping={this.props.filter.timeGrouping?this.props.filter.timeGrouping:'day'}
					rangeFilterVal={this.props.filter.ratings.max&&this.props.filter.ratings.min?this.props.filter.ratings:{min:0, max:10}}
					dataGrouping={this.props.filter.dataGrouping?this.props.filter.dataGrouping:'count'}
					spots={this.props.auth.spots}
				/>
				{this.checkSessions()}
				</div>
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

function mapStateToProps({ auth, filter, sessions }) {
	return { auth, filter, sessions };
}

export default connect(mapStateToProps, { fetchSessions, filterSessions })(logPage);