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
      visible={!props.disabled}
      placement="top"

      key={index}
    >
      <Handle value={value} {...restProps} />
    </Tooltip>
  );
};

export default ({ input, label, rating, isActive, meta:{touched, error} }) => {

	return (
		  <div className="row valign-wrapper">
		  	<div className="col s3 m3">
		  		<label className="flow-text">{label}</label>
		  	</div>
		  	<div className="col s6 m8">
		  			<Slider handle={handle}
								onChange={input.onChange} {...isActive} 
								defaultValue={0} 
								max={10}
								step={0.1} />		  	
				  <div className="red-text">
		  			{touched && error}
		  		</div>
		  	</div>
		  	<div className="col s3 m1 valign-wrapper">
		  		<div id="surfVal" style={{backgroundColor: 'rgba(255,152,0 ,'+input.value/100 +')' }}></div>
			  	<span style={{position:'absolute', width:'50px', textAlign: 'center'}}>
				  		{input.value}
				  </span>
		  	</div>
		  </div>
		);
};