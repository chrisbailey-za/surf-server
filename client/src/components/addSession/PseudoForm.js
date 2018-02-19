import React, { Component } from "react";
import PseudoSlider from "../forms/PseudoSlider";
import DirectionSelector from "../forms/DirectionSelector";
import { Field } from "redux-form";


class PseudoForm extends Component {

		render() {
		return (
			<div>
				<Field min={-5} max={5} step={0.1} unit="m" label="Swell Size" type="text" name="pseudoSwell" component={PseudoSlider}/>
				<Field min={-50} max={50} step={1} unit="km/h" label="Wind Speed" type="text" name="pseudoWind" component={PseudoSlider}/>
				<Field min={-1.5} max={1.5} step={0.1} unit="m" label="Tide" type="text" name="pseudoTide" component={PseudoSlider}/>
				<Field label="Wind Direction" sliderId="windSlider" name="pseudoWindDir" component={DirectionSelector}/>
				<Field label="Swell Direction" sliderId="swellSlider" name="pseudoSwellDir" component={DirectionSelector}/>
			 </div>
			)
	}
}

export default PseudoForm