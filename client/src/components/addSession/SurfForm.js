import React, { Component } from "react";
import { reduxForm, Field, change } from "redux-form";
import $ from "jquery";
import RatingSlider from "../forms/RatingSlider";
import TextInput from "../forms/TextInput";
import SpotSelector from "../forms/SpotSelector";
import DateSelector from "../forms/DateSelector";
import TimeSelector from "../forms/TimeSelector";
import PseudoSession from "./PseudoSession";
import * as actions from "../../actions/index";

class SurfForm extends Component {

	constructor(props){
    super(props);
    this.getSpots = this.getSpots.bind(this);
    this.dispatchSubmit = this.dispatchSubmit.bind(this);
  }

  dispatchSubmit(values, dispatch, history) {
    actions.saveSession(values, this.props.history);
	}

	getSpots(){
		return this.props.spots;
	}

	componentDidMount(){

	  $('.datepicker').pickadate({
	    selectMonths: false, // Creates a dropdown to control month
	    today: 'Today',
	    clear: 'Clear',
	    close: 'Ok',
	    closeOnSelect: true // Close upon selecting a date,
	  });

	  $('.timepicker').pickatime({
	    default: 'now', // Set default time: 'now', '1:30AM', '16:30'
	    fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
	    twelvehour: false, // Use AM/PM or 24-hour format
	    donetext: 'OK', // text for done-button
	    cleartext: 'Clear', // text for clear-button
	    canceltext: 'Cancel', // Text for cancel-button
	    autoclose: true, // automatic close timepicker
	    ampmclickable: true, // make AM PM clickable
	    aftershow: function(){} //Function for after opening timepicker
	  });
	}

	renderFields(){
		return (
				<div>
					<Field label="Spot Name" spots={this.getSpots()} type="text" name="spot" component={SpotSelector}/>
					<Field label="Date" type="text" name="date" component={DateSelector}/>
					<Field label="Time" type="text" name="time" component={TimeSelector}/>
					<Field label="Rating" type="range" name="rating" component={RatingSlider}/>
					<Field label="Comments" type="text" name="comments" component={TextInput}/>
				</div>
			);
	};

	render() {
		return (
			<div style={{paddingTop: '5%'}}>
				<form onSubmit={this.props.handleSubmit((values, dispatch) => this.dispatchSubmit(values, dispatch))}>
					{this.renderFields()}
					<PseudoSession change={this.props.change}></PseudoSession>
					<div className="valign-wrapper">
						<button className="orange btn-large black-text" type="submit" style={{margin:'auto auto 50px auto', width:'80%', minHeight:'54px', height:'auto', lineHeight: '22px'}}>Add Session</button>
					</div>
				</form>
			</div>
		);
	}
}

function validate(values){
	const errors = {};

	if(!values.spot){
		errors.spot = "You need to choose a spot";
	}
	if(!values.date){
		errors.date = "You need to add a date";
	}
	if(!values.time){
		errors.time = "You need to add a time";
	}
	if(!values.rating){
		errors.rating = "It needs a rating";
	}

	return errors;
}

export default reduxForm({
	validate,
	form: "surfForm",
	change: change
})(SurfForm);


