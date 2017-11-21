import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
	return (
		<div>
			<div>
				Dashboard
			</div>
			<div className="fixed-action-btn">
		    <Link to="/surf/new" className="btn-floating btn-large orange">
		      <i className="large material-icons">add</i>
		    </Link>
	    </div>
	  </div>
		);
};

export default Dashboard;