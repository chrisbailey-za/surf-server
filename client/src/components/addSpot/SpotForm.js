import React, { Component } from "react";
import { reduxForm, Field, change } from "redux-form";
import $ from "jquery";
import DirectionSelector from "../forms/DirectionSelector";
import SpotSelector from "../forms/SpotSelector";

class SpotForm extends Component {

	constructor(props){
      super(props);
      this.updateWind = this.updateWind.bind(this);
      this.updateSwell = this.updateSwell.bind(this);
  }

  updateSwell(val){
		this.props.change('swellDir', val);
	}

	updateWind(val){
		this.props.change('windDir', val);
	}

	componentDidMount(){
		var self = this;
		$("#windSlider").roundSlider({
	    sliderType: "min-range",
	    handleShape: "square",
	    width: 5,
	    radius: 50,
	    max: 360,
	    startAngle: 90,
	    showTooltip: false,
	    drag: function (args) {
	      self.updateWind(args.value);
	    }
	  });
		$("#swellSlider").roundSlider({
	    sliderType: "min-range",
	    handleShape: "square",
	    width: 5,
	    radius: 50,
	    max: 360,
	    startAngle: 90,
	    showTooltip: false,
	    drag: function (args) {
	      self.updateSwell(args.value);
	    }
	  });
	}

	renderFields(){
		return (
				<div>
					<Field label="Spot Name" type="text" name="spotName" component='input'/>
					<Field label="Closest Location" type="text" name="location" component={SpotSelector}/>
					<Field label="Wind Direction" sliderId="windSlider" name="windDir" component={DirectionSelector}/>
					<Field label="Swell Direction" sliderId="swellSlider" name="swellDir" component={DirectionSelector}/>
				</div>
			);
	};

	render() {
		return (
			<div style={{paddingTop: '5%'}}>
				<form onSubmit={this.props.handleSubmit(values => console.log(values))}>
					{this.renderFields()}
					<div className="valign-wrapper">
						<button className="orange btn-large black-text" type="submit">Add Spot</button>
					</div>
				</form>
			</div>
		);
	}
}

export default reduxForm({
	form: "spotForm",
	change: change
})(SpotForm);


