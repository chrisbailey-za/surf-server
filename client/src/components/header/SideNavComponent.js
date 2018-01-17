import React, { Component } from 'react';
import { Drawer } from 'material-ui';
import SideNav from './SideNav'

class SideNavComponent extends Component {

	constructor(props){
    super(props);
    this.state = {navopen: false};
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleToggle(){
  	this.setState({navopen: !this.state.open});
  }

  handleClose(){
  	this.setState({navopen: false});
  }

	render(){
		return(
			<div>
				<ul id="nav-mobile" className="left">
					<li>
						<a onClick={this.handleToggle}>
							<i className="material-icons" >menu</i>
						</a>
					</li>
				</ul>
				<Drawer
					docked={false}
					open={this.state.navopen}
					width={300}
					onRequestChange={(navopen) => this.setState({navopen})}
				>
					<SideNav handleClose = {this.handleClose} />
				</Drawer>
			</div>
		)
	}
}

export default SideNavComponent;