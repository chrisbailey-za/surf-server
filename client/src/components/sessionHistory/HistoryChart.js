import React, { Component } from "react";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryLabel } from 'victory';

const data=[
{date: new Date(2017, 10, 1), spot: 'dunes', rating: 72},
{date: new Date(2017, 10, 3), spot: 'spotx', rating: 35},
{date: new Date(2017, 10, 9), spot: 'inners', rating: 89},
{date: new Date(2017, 10, 9), spot: 'outers', rating: 68},
{date: new Date(2017, 10, 10), spot: 'dunes', rating: 46},
{date: new Date(2017, 10, 14), spot: 'spotx', rating: 94},
{date: new Date(2017, 10, 17), spot: 'outers', rating: 12},
{date: new Date(2017, 10, 17), spot: 'outers', rating: 36},
{date: new Date(2017, 10, 17), spot: 'dunes', rating: 77},
{date: new Date(2017, 10, 20), spot: 'dunes', rating: 72},
{date: new Date(2017, 11, 1), spot: 'spotx', rating: 69},
{date: new Date(2017, 11, 3), spot: 'spotx', rating: 48},
{date: new Date(2017, 11, 4), spot: 'outers', rating: 53},
{date: new Date(2017, 11, 4), spot: 'inners', rating: 19},
{date: new Date(2017, 11, 8), spot: 'inners', rating: 77},
{date: new Date(2017, 11, 8), spot: 'dunes', rating: 65}
];


class HistoryChart extends Component {


	render() {
		return (
			<div>
					<div className="valign-wrapper">
						<VictoryChart domainPadding={{x: 5}} theme={VictoryTheme.material} height={150}>
							<VictoryAxis
								theme={VictoryTheme.material}
								scale="time"
								style={{grid: {stroke: "none"}}}
								tickLabelComponent={<VictoryLabel angle={-90} style={{fontSize:'6px'}}/>}
			        />
			        <VictoryAxis
								theme={VictoryTheme.material}
								dependentAxis
								style={{grid: {stroke: "none"}}}
								domain={{y: [0, 100]}}
								tickValues={[0, 20, 40, 60, 80, 100]}
								tickLabelComponent={<VictoryLabel angle={0} style={{fontSize:'6px'}}/>}
			        />
								<VictoryBar
									height={150}
									barRatio={0.4} 
									data={data}
									style={{ data: { fill:(d) => d.rating >= 80 ? "#ff9800" : "#0097a7", opacity: 1 } }}
									sortKey='date'
									x='date'
									y={(d) => d.rating}
								/>
						</VictoryChart>
					</div>
			</div>
		);
	}
}

export default HistoryChart


