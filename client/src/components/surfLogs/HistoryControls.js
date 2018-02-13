import React from 'react';
import { DropDownMenu, MenuItem } from 'material-ui';
import Slider, { Range } from 'rc-slider';
import Tooltip from 'rc-tooltip';

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

const SpotFilter = ({ spots, spotFilterVal, timeGrouping, rangeFilterVal, dataGrouping, setFilterValues }) => {

	const spotList = (() => {
			return spots.map((spot) => {
		 		return <MenuItem value={spot.spotId} primaryText={spot.name} key={spot.spotId}/>
		 	})
	})();

	const groupMethods = [{val: 'count', text: 'Number of Sessions'},{val: 'ave', text: 'Average Rating'},{val: 'max', text: 'Maximum Rating'},{val: 'min', text: 'Minimum Rating'}]

	const methodList = (() => {
			return groupMethods.map((method) => {
		 		return <MenuItem value={method.val} primaryText={method.text} key={method.val}/>
		 	})
	})();

	const timeMethods = [{val: 'day', text: 'Day'},{val: 'month', text: 'Month'},{val: 'year', text: 'Year'}]

	const timeGroupingList = (() => {
			return timeMethods.map((method) => {
		 		return <MenuItem value={method.val} primaryText={method.text} key={method.val}/>
		 	})
	})();

	return (
		<div>
			<div className="row valign-wrapper">
				<div className="col s5 m3">
		  		<label>Show me the</label>
		  	</div>
		  	<div className="col s7 m9 input-field">
			  	 <DropDownMenu
	  		 		value={dataGrouping}
	  		 		className="mcol s9 "
	  		 		autoWidth={false}
	  		 		onChange={(event, key, payload) => setFilterValues(payload, 'dataGrouping')}
	  		 		style={{width:'100%'}}
	  		 		selectedMenuItemStyle={{color:'#ff9800'}}
	  		 	>
	  		 		{methodList}
  				</DropDownMenu>
		  	</div>
		  </div>

			<div className="row valign-wrapper">
		  	<div className="col s5 m3">
		  		<label>Grouped By:</label>
		  	</div>
		  	<div className="col s7 m9 input-field">
  				<DropDownMenu
	  		 		value={timeGrouping}
	  		 		className="mcol s9 "
	  		 		autoWidth={false}
	  		 		onChange={(event, key, payload) => setFilterValues(payload, 'timeGrouping')}
	  		 		style={{width:'100%'}}
	  		 		selectedMenuItemStyle={{color:'#ff9800'}}
	  		 	>
	  		 		{timeGroupingList}
  				</DropDownMenu>
  			</div>
  		</div>

		  <div className="row valign-wrapper">
		  	<div className="col s5 m3">
		  		<label>Filter By Spots:</label>
		  	</div>
		  	<div className="col s7 m9 input-field">
		  		 	<DropDownMenu
		  		 		value={spotFilterVal}
		  		 		className="mcol s9 "
		  		 		autoWidth={false}
		  		 		multiple={true}
		  		 		onChange={(event, key, payload) => setFilterValues(payload, 'spots')}
		  		 		style={{width:'100%'}}
		  		 		selectedMenuItemStyle={{color:'#ff9800'}}
		  		 	>
		  		 		{spotList}
	  				</DropDownMenu>
	  			</div>
	  		</div>

  			<div className="row valign-wrapper">
	  			<div className="col s5 m3">
			  		<label>Filter by Ratings:</label>
			  	</div>
			  	<div className="col s7 m9 input-field">
				  	<Range onChange={(vals) => setFilterValues({min: vals[0], max: vals[1]}, 'ratings')}
				  		handle={handle}
				  		range={true}
				  		defaultValue={[rangeFilterVal.min, rangeFilterVal.max]}
				  		step={0.1} min={0} max={10} style={{width:'100%'}}>
						</Range>
			  	</div>
			  </div>
			</div>
		);
};

export default SpotFilter