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
		  <ul onClick={this.props.handleClose} className="side-nav grey lighten-3" style={{transform: 'none'}}>
			  <li>
			    <div className="background cyan darken-3 user-view">
			    <div style={{display: 'block'}}>
						</div>
						<div className='email'>
							<img src='/img/Logo.png' alt="" style={imageStyle}></img>
			      	<h4 className="cyan-text text-lighten-4" style={{fontFamily: 'Pacifico'}}>Surf Recce</h4>
			      </div>
			    </div>
		    </li>
		    <li><div className="divider no-margin"></div></li>
		    <li><Link to="/" >Home<i className="material-icons cyan-text text-darken-3 right">home</i></Link></li>
		    <li><Link to="/session/add">Add a Session<i className="material-icons cyan-text text-darken-3 right">add_circle</i></Link></li>
		    <li><Link to="/session/logs">My Surf Logs<i className="material-icons cyan-text text-darken-3 right">equalizer</i></Link></li>
		    <li><Link to="/spot/add">Add a Spot<i className="material-icons cyan-text text-darken-3 right">place</i></Link></li>
		    <li><Link to="/spot/list">My Spots<i className="material-icons cyan-text text-darken-3 right">settings</i></Link></li>
		    <li><Link to="/notifications">My Notifications<i className="material-icons cyan-text text-darken-3 right">notifications</i></Link></li>
		  </ul>
		)
	}
}

export default SideNav;