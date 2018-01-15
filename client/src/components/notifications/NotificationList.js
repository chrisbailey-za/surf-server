import React, { Component } from "react";
import { connect } from 'react-redux';
import { reduxForm, Field, change } from "redux-form";
import SpotNotificationSlider from './SpotNotificationSlider';
import { fetchNotifications } from '../../actions';


class NotificationList extends Component {

	componentDidMount(){
		this.props.fetchNotifications();
	}

	renderFields(){
		return this.props.notifications.map(({ spotName, notification, notificationVal }) => {
			return(					
				<Field type="text" key={spotName} name={spotName} label={spotName} rating={notificationVal} isActive={notification} component={SpotNotificationSlider}/>
			)
		});
	};

	render() {
		return (
			<div style={{paddingTop: '3%'}}>
				<div className="row valign-wrapper card grey darken-1 white-text" style={{paddingTop:'1%', paddingBottom:'1%', marginBottom:'40px'}}>
					<div className="col s6 m4 valign-wrapper">
				  	<div className="col s6 ">
				  		<div className="flow-text show-on-small-only hide-on-med-and-up">Spot</div>
							<div className="flow-text hide-on-small-only">Spot Name</div>
						</div>
				  	<div className="col s6 valign-wrapper">
							<div className="flow-text">On/Off</div>				  	
						</div>
					</div>
					<div className="col s6 m8 ">
						<div className="flow-text show-on-small-only hide-on-med-and-up">Only when?</div>
						<div className="flow-text hide-on-small-only">How good does it have to get before we let you know?</div>
					</div>
				</div>
				<form onSubmit={this.props.handleSubmit(values => console.log(values))}>
					{this.renderFields()}
					<div className="valign-wrapper">
						<button className="orange btn-large black-text" type="submit" style={{margin:'auto auto 50px auto', width:'80%', minHeight:'54px', height:'auto', lineHeight: '22px'}}>Save Notification Preferences</button>
					</div>
				</form>
			</div>
		);
	}
}

function mapStateToProps({ notifications }){
	return { notifications };
}

NotificationList = connect( mapStateToProps, {fetchNotifications} )(NotificationList)

export default reduxForm({
	form: "notificationList",
	change: change
})(NotificationList);


