import React, { Component } from 'react';
import SideNav from './SideNav'

class SideNavComponent extends Component {

	constructor(props){
    super(props);
    this.state = {visibility: {transform: 'translateX(-105%)', transition: 'all 0.8s'}};
    this.showMenu = this.showMenu.bind(this);
    this.hideMenu = this.hideMenu.bind(this);
  }

  showMenu(){
    this.setState({visibility: {transform: 'none', transition: 'all 0.8s'}});
  }

  hideMenu(){
  	this.setState({visibility: {transform: 'translateX(-105%)', transition: 'all 0.8s'}});
  }
	
	render(){

		return(
			<div>
				<ul id="nav-mobile" className="left">
					<li>
						<a onClick={this.showMenu}>
							<i className="material-icons" >menu</i>
						</a>
					</li>
				</ul>
				<SideNav vis={this.state.visibility} changeVis={this.hideMenu}/>
			</div>
		)
	}
}

export default SideNavComponent;