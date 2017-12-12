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

export default ({ input, label, rating, func, isActive }) => {
		
	return (
		  	<div className="col s6 m8">
		  			<Slider handle={handle}
								onChange={input.onChange} {...isActive} 
                className='inverted'
								defaultValue={100-(parseInt(rating,10)*5)} />
		  	</div>
		);
};