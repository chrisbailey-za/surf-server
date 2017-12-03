import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SideNav extends Component {

	render(){

		var imageStyle = {
			height: '50%',
			width: '50%',
			margin: 'auto',
		}

		return(
		  <ul onClick={this.props.changeVis} id="slide-out" className="side-nav grey lighten-3" style={this.props.vis}>
			  <li>
			    <div className="background cyan darken-3 user-view">
			    <div style={{display: 'block'}}>
						<a className="right">
								<i className="material-icons right" style={{margin: 0}}>close</i>
						</a>
						</div>
						<div className='email'>
							<img src='/img/Logo3.svg' alt="" style={imageStyle}></img>
			      	<h4>My SurfApp</h4>
			      </div>
			    </div>
		    </li>
		    <li><div className="divider no-margin"></div></li>
		    <li><Link to="/home">Home<i className="material-icons cyan-text text-darken-3 right">home</i></Link></li>
		    <li><Link to="/surf/add">Add a Session<i className="material-icons cyan-text text-darken-3 right">add_circle</i></Link></li>
		    <li><Link to="#">My Surf Logs<i className="material-icons cyan-text text-darken-3 right">equalizer</i></Link></li>
		    <li><Link to="/spot/add">Add a Spot<i className="material-icons cyan-text text-darken-3 right">place</i></Link></li>
		    <li><Link to="#">My Spots<i className="material-icons cyan-text text-darken-3 right">settings</i></Link></li>
		    <li><Link to="/notifications">My Notifications<i className="material-icons cyan-text text-darken-3 right">notifications</i></Link></li>
		  </ul>
		)
	}
}

export default SideNav;