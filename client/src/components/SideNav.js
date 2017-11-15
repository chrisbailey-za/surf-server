import React, { Component } from 'react';

class SideNav extends Component {

	render(){

		var imageStyle = {
			height: '50%',
			width: '50%',
			margin: 'auto',
		}

		return(
		  <ul id="slide-out" className="side-nav grey lighten-3" style={this.props.vis}>
			  <li>
			    <div className="background cyan darken-3 user-view">
			    <div style={{display: 'block'}}>
						<a onClick={this.props.changeVis} className="right">
								<i className="material-icons right" style={{margin: 0}}>close</i>
						</a>
						</div>
						<div className='email'>
							<img src='img/Logo3.svg' style={imageStyle}></img>
			      	<h4>My SurfApp</h4>
			      </div>
			    </div>
		    </li>
		    <li><div className="divider no-margin"></div></li>
		    <li><a href="#!">Home<i className="material-icons cyan-text text-darken-3 right">home</i></a></li>
		    <li><a href="#!">Add a Surf<i className="material-icons cyan-text text-darken-3 right">add_circle</i></a></li>
		    <li><a href="#!">My Surf Logs<i className="material-icons cyan-text text-darken-3 right">equalizer</i></a></li>
		    <li><a href="#!">Add a Spot<i className="material-icons cyan-text text-darken-3 right">place</i></a></li>
		    <li><a href="#!">My Spots<i className="material-icons cyan-text text-darken-3 right">settings</i></a></li>
		    <li><a href="#!">My Notifications<i className="material-icons cyan-text text-darken-3 right">notifications</i></a></li>
		  </ul>
		)
	}
}

export default SideNav;