import React, { Component } from "react";
import { reduxForm, Field, change } from "redux-form";
import $ from "jquery";
import RatingSlider from "../forms/RatingSlider";
import TextInput from "../forms/TextInput";
import SpotSelector from "../forms/SpotSelector";
import DateSelector from "../forms/DateSelector";
import TimeSelector from "../forms/TimeSelector";
import PseudoSession from "./PseudoSession";

class SurfForm extends Component {

	componentDidMount(){
    $('select').material_select();

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
					<Field label="Spot Name" type="text" name="spot" component={SpotSelector}/>
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
				<form onSubmit={this.props.handleSubmit(values => console.log(values))}>
					{this.renderFields()}
					<PseudoSession change={this.props.change}></PseudoSession>
					<div className="valign-wrapper">
						<button className="orange btn-large black-text" type="submit">Add Surf</button>
					</div>
				</form>
			</div>
		);
	}
}

export default reduxForm({
	form: "surfForm",
	change: change
})(SurfForm);


