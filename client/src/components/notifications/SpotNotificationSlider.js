import React, { Component} from 'react';
import Slider from 'rc-slider';
import { change } from 'redux-form';
import { Toggle } from 'material-ui';
import Tooltip from 'rc-tooltip';
import '../forms/styles/rc-slider.css';

const Handle = Slider.Handle;

const handle = (props) => {
  const { value, dragging, index, isActive, ...restProps } = props;
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      visible={!props.disabled}
      placement="top"

      key={index}
    >
      <Handle value={value} {...restProps} />
    </Tooltip>
  );
};

class SpotNotificationSlider extends Component {

  constructor(props){
    super(props);
    this.state = {toggled: this.props.isActive};
    this.toggleState = this.toggleState.bind(this);
	}

  toggleState(val){
    this.setState({toggled: val});
    this.props.meta.dispatch(change('notificationList',this.props.label + 'Toggle',val));
  }

	render (){
    return(

    <div className="row valign-wrapper">
		  <div className="col s6 m4 valign-wrapper">
        <div className="col s6 ">
          <label className="flow-text">{this.props.label}</label>
        </div>
        <div className="col s6 valign-wrapper">
          <Toggle onToggle={( event, val) => this.toggleState(val)} defaultToggled={this.props.isActive} thumbSwitchedStyle={{backgroundColor:'#0097a7'}}></Toggle>
        </div>
      </div>
      <div className="col s6 m8">
  			<Slider handle={handle}
						onChange={this.props.input.onChange}
            disabled={!this.state.toggled} 
            className='inverted'
						defaultValue={this.props.rating} />
		  	</div>
      </div>
		)
  };
};

export default SpotNotificationSlider
