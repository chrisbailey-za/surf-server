import React, { Component } from "react";
import { reduxForm, Field, change, formValueSelector } from "redux-form";
import $ from "jquery";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from "../../actions/index";
import DirectionSelector from "../forms/DirectionSelector";
import LocationSelector from "../forms/LocationSelector";
import NameInput from "../forms/NameInput";
import SpotSeperator from "./SpotSeperator";
import SpotQuality from "../forms/SpotQuality";
import RangeSlider from "../forms/RangeSlider";

class SpotForm extends Component {

	constructor(props){
      super(props);
      this.updateSwellDir = this.updateSwellDir.bind(this);
      this.updateWindDir = this.updateWindDir.bind(this);
      this.windSpeedChange = this.windSpeedChange.bind(this);
      this.swellSizeChange = this.swellSizeChange.bind(this);
      this.tideChange = this.tideChange.bind(this);
      this.dispatchSubmit = this.dispatchSubmit.bind(this);
  }

  dispatchSubmit(values, dispatch, history) {
    return dispatch(actions.saveSpot(values, this.props.history));
	}

  updateSwellDir(val){
		this.props.change('swellDir', val);
	}

	updateWindDir(val){
		this.props.change('windDir', val);
	}

	windSpeedChange(val){
		console.log(val);
		this.props.change('windSpeedMin', val[0]);
		this.props.change('windSpeedMax', val[1]);
	}

	swellSizeChange(val){
		this.props.change('swellSizeMin', val[0]);
		this.props.change('swellSizeMax', val[1]);
	}

	tideChange(val){
		this.props.change('tideMin', val[0]);
		this.props.change('tideMax', val[1]);
	}

	componentDidMount(){
		var self = this;
		$("#windDir").roundSlider({
	    sliderType: "min-range",
	    handleShape: "square",
	    width: 5,
	    radius: 50,
	    max: 360,
	    startAngle: 90,
	    showTooltip: false,
	    drag: function (args) {
	      self.updateWindDir(args.value);
	    }
	  });
		$("#swellDir").roundSlider({
	    sliderType: "min-range",
	    handleShape: "square",
	    width: 5,
	    radius: 50,
	    max: 360,
	    startAngle: 90,
	    showTooltip: false,
	    drag: function (args) {
	      self.updateSwellDir(args.value);
	    }
	  });
	}

	renderFields(){
		return (
				<div>
					<Field label="Spot Name" type="text" name="spotName" component={NameInput}/>
					<Field label="Closest MSW Location" type="text" name="location" component={LocationSelector}/>
					<Field label="How good does it get?" type="text" name="quality" component={SpotQuality}/>
					<SpotSeperator />
					<Field label="Swell Size" func={this.swellSizeChange} unit="meters" step={0.2} start={[2,5]} range={{min:0, max:15}} name="swellSize" component={RangeSlider}/>
					<div className="row">
						<label className="col">This assumes a swell period of 14sec. We do account for different swell periods, but that is taken care of behind the scenes.</label>
					</div>
					<Field label="Swell Direction" sliderId="swellDir" name="swellDir" component={DirectionSelector}/>
					<Field label="Wind Speed" func={this.windSpeedChange} unit="km/h" step={1} start={[0,20]} range={{min:0, max:50}} name="windSpeed" component={RangeSlider}/>
					<Field label="Wind Direction" sliderId="windDir" name="windDir" component={DirectionSelector}/>
					<Field label="Tide" func={this.tideChange} unit="meters" step={0.1} start={[1,1.5]} range={{min:0, max:2.5}} name="tide" component={RangeSlider}/>
				</div>
			);
	};

	render() {

		return (
			<div style={{paddingTop: '5%'}}>
				<form onSubmit={this.props.handleSubmit((values, dispatch) => this.dispatchSubmit(values, dispatch))}>					
				{this.renderFields()}
					<div className="valign-wrapper">
						<button className="orange btn-large black-text" type="submit" style={{margin:'auto auto 50px auto', paddingLeft:'30%', paddingRight:'30%'}}>Add Spot</button>
					</div>
				</form>
			</div>
		);
	}

}

function validate(values){
	const errors = {};

	if(!values.spotName){
		errors.spotName = "You need to give your spot a name";
	};
	if(!values.location){
		errors.location = "Which of theses is it closest to?";
	};
	if(!values.quality){
		errors.quality = "Sorry, you need to add this";
	};
	if(!values.swellSize){
		errors.swellSize = "You need to add this, how else do you think this works?";
	};
	if(!values.swellDir){
		errors.swellDir = "You need to add this, how else do you think this works?";
	};
	if(!values.windSpeed){
		errors.windSpeed = "You need to add this, how else do you think this works?";
	};
	if(!values.windDir){
		errors.windDir = "You need to add this, how else do you think this works?";
	};
	if(!values.tide){
		errors.tide = "You need to add this, how else do you think this works?";
	};

	return errors;
}

export default reduxForm({
	validate,
	form: 'spotForm',
	change: change,
})(withRouter(SpotForm));

