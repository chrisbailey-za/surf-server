import React from 'react';
import Slider, { Range } from 'rc-slider';
import Tooltip from 'rc-tooltip';
import './styles/rc-slider.css';

const Handle = Slider.Handle;

const handle = (props) => {
  const { value, index, ...restProps } = props;
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      visible={true}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </Tooltip>
  );
};

export default ({ input, func, step, label, start, range, unit, meta:{ error, touched } }) => {

	return (
		  <div className="row valign-wrapper">
		  	<div className="col s3 m3">
		  		<label className="flow-text">{label}</label>
		  	</div>
		  	<div className="col s6 m8">
			  	<Range onChange={input.onChange}
			  		handle={handle}
			  		range={true}
			  		defaultValue={start}
			  		step={step} min={range.min} max={range.max} style={{width:'100%'}}>
					</Range>
					<div className="red-text">
	  				{touched && error}
	  			</div>
		  	</div>
		  	<div className="col s3 m1 valign-wrapper">
			  	<span style={{ textAlign: 'center', fontWeight:'bold'}}>
				  		Measured in {unit}
				  </span>
		  	</div>
		  </div>
		);
};