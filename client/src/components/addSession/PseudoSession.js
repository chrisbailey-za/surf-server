import React, { Component } from "react";
import { Toggle } from "material-ui";
import { Field } from "redux-form";
import PseudoForm from "./PseudoForm";
// eslint-disable-next-line
import roundSlider from "round-slider";
import $ from 'jquery';

class PseudoSession extends Component {

	  constructor(props){
        super(props);
        this.updateWind = this.updateWind.bind(this);
        this.updateSwell = this.updateSwell.bind(this);
    }

    updateSwell(val){
			this.props.change('pseudoSwellDir', val);
		}

		updateWind(val){
			this.props.change('pseudoWindDir', val);
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

		togglePseudo(val){
			val ? $('#pseudo').slideDown() : $('#pseudo').slideUp();
			this.props.change('pseudoToggle', val);
		}

		render() {
		return (
			<div>
			  <div className="row valign-wrapper">
			  	<div className="col s9">
			  		<label className="flow-text">Know what could have been better?</label>
			  	</div>
			  	<div className="col s3">
			  			<Toggle onToggle={( blank, val) => this.togglePseudo(val)} thumbSwitchedStyle={{backgroundColor:'#0097a7'}}></Toggle>
			  			<Field name="pseudoToggle" component="input" style={{display:'none'}}></Field>					
			  	</div>
			  </div>
			  <div className="row valign-wrapper">
			  	<div id='pseudo' className="col s12" style={{display:'none'}}>
			  			<PseudoForm change={this.props.change}></PseudoForm>
			  	</div>
			  </div>
			 </div>
			)
	}
}

export default PseudoSession