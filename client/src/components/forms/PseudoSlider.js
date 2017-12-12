import React from 'react';
import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip';
import '../forms/styles/rc-slider.css';

const Handle = Slider.Handle;

const handle = (props) => {
  const { value, dragging, index, isActive, ...restProps } = props;
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      visible={dragging}
      placement="top"

      key={index}
    >
      <Handle value={value} {...restProps} />
    </Tooltip>
  );
};

export default ({ unit, input, label, min, max, step, isActive, }) => {

	return (
		  <div className="row valign-wrapper">
		  	<div className="col s3 m3">
		  		<label className="flow-text">{label}</label>
		  	</div>
		  	<div className="col s6 m8">
		  			<Slider handle={handle}
		  					step={step} 
		  					min={min} 
		  					max={max} 
		  					style={{width:'100%'}}
		  					trackStyle={{visibility: 'hidden'}}
								onChange={input.onChange} {...isActive} 
								defaultValue={0} />		
		  	</div>
		  	<div className="col s3 m1 valign-wrapper">
			  	<span>
				  		{input.value > 0 ? '+'+input.value : input.value} {unit}
				  </span>
		  	</div>
		  </div>
		);
};