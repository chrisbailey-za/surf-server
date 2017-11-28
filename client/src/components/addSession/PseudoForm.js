import React, { Component } from "react";
import PseudoSlider from "../forms/PseudoSlider";
import DirectionSelector from "../forms/DirectionSelector";
import { Field } from "redux-form";


class PseudoForm extends Component {

		render() {
		return (
			<div>
				<Field unit="ft" label="Swell Size" type="text" name="pseudoSwell" component={PseudoSlider}/>
				<Field unit="km/h" label="Wind Speed" type="text" name="pseudoWind" component={PseudoSlider}/>
				<Field unit="m" label="Tide" type="text" name="pseudoTide" component={PseudoSlider}/>
				<Field label="Wind Direction" sliderId="windSlider" name="pseudoWindDir" component={DirectionSelector}/>
			 </div>
			)
	}
}

export default PseudoForm