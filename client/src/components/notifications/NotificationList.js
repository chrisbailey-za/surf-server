import React, { Component } from "react";
import _ from 'lodash';
import { connect } from 'react-redux'
import { reduxForm, Field, change, formValueSelector } from "redux-form";
import SpotNotificationToggle from './SpotNotificationToggle';
import SpotNotificationSlider from './SpotNotificationSlider';


const FIELDS = [
			{name: 'kom', rating: 5},
			{name: 'krans', rating: 3},
			{name: 'inners', rating: 2},
			{name: 'dunes', rating: 4},
			{name: 'spotx', rating: 3}
		];


class NotificationList extends Component {

	constructor(props){
      super(props);
      this.slideFunc = this.slideFunc.bind(this);
  }

	slideFunc(event){
		console.log(event);
		//this.props.change(name, val[0]);
	}

	isToggled(val, name){
		if(val>2){
			return true;	
		};
	}

	sliderActive(name, val){
	if(val<3 && !this.props[name+'Active']){
			return {disabled: true};
	}else if(this.props[name+'Active'] === false){
			return {disabled: true};
		}
	}


	renderFields(){
		return _.map(FIELDS, ({ name, rating }) => {
			return(	
				<div className="row valign-wrapper" key={name}>
					<Field type="text" label={name} name={name+'Toggle'} rating={rating} isToggled={this.isToggled(rating, name)} component={SpotNotificationToggle}/>
					<Field type="text" label={name} name={name} rating={rating} isActive={this.sliderActive(name, rating)} func={this.slideFunc} component={SpotNotificationSlider}/>
				</div>
			)
		});
	};

	render() {
		return (
			<div style={{paddingTop: '5%'}}>
				<form onSubmit={this.props.handleSubmit(values => console.log(values))}>
					{this.renderFields()}
				</form>
			</div>
		);
	}
}

const selector = formValueSelector('notificationList') // <-- same as form name
NotificationList = connect(
  state => {
  		const komActive = selector(state, 'komToggle');
			const kransActive = selector(state, 'kransToggle');
			const innersActive = selector(state, 'innersToggle');
			const dunesActive = selector(state, 'dunesToggle');
			const spotxActive = selector(state, 'spotxToggle');
    return {
      komActive,
      kransActive,
      innersActive,
      dunesActive,
      spotxActive
    }
  }
)(NotificationList)

export default reduxForm({
	form: "notificationList",
	change: change
})(NotificationList);


