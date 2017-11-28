import React, { Component } from 'react';
import SideNav from './SideNav'

class SideNavComponent extends Component {

	constructor(props){
    super(props);
    this.state = {visibility: {transform: 'translateX(-105%)', transition: 'all 0.8s'}};
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu(){
  	var visState = this.state.visibility;
  	visState.transform === 'none' ? 
  	this.setState({visibility: {transform: 'translateX(-105%)', transition: 'all 0.8s'}}) : 
  	this.setState({visibility: {transform: 'none', transition: 'all 0.8s'}});
  }

	render(){

		return(
			<div>
				<ul id="nav-mobile" className="left">
					<li>
						<a onClick={this.toggleMenu}>
							<i className="material-icons" >menu</i>
						</a>
					</li>
				</ul>
				<SideNav vis={this.state.visibility} changeVis={this.toggleMenu}/>
			</div>
		)
	}
}

export default SideNavComponent;