import React, { Component } from "react";
import PrimaryData from './PrimaryData';
import { CircleLoader } from 'react-spinners';

class TableLoader extends Component {

	chooseRender(){
		if(this.props.loading){
			return (
				<div className="grey lighten-2" style={{width:'198vw', height:'272px', textAlign:'-webkit-center', paddingTop:'80px'}}>
					<div style={{margin:'auto'}}>
						<CircleLoader loading={this.props.loading} color="#0097a7" size={100}/>
					</div>
				</div>
				)
		}else{
			return <PrimaryData forecast={this.props.forecast} hideNights={this.props.hideNights} showEvery={this.props.showEvery} showSecondary={this.props.showSecondary} />
		}
	}

	render(){
		return(
			<div className="col" style={{overflowX:'scroll', display:'flex'}}>
				{this.chooseRender()}
			</div>
		)
	}

}

export default TableLoader