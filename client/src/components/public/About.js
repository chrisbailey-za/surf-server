import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {

	return(
		<div style={{textAlign: 'center', overflow:'hidden'}}>
				<h1 style={{paddingTop: '1%', fontFamily: 'Pacifico'}}>
					<span >Surf Recce</span>
				</h1>
				<div className='row'>
					<div className='col s10 m10 l10 xl6 push-s1 push-m1 push-l1 push-xl3'>
						<h5 style={{fontSize: '1.5em'}}>

							This app is designed for the CT surf explorer - the guy or girl that has no problem going off the beaten track and surfing
							some unnamed spot. It's for those surfers where the number of spots in our brain's memory banks exceed what can be
							process every time we check the forecast for the coming week.

							How it works:

							To get the best suggestions, you will need to add all (or as many) of your local spots and log all (or as many) of your sessions as possible.
							We then look at how you rated each of those sessions and use that data to calculate how good each spot is going to
							be for each hour of each day in the coming week.

							Emphasis!!!

							All of the spots and sessions that you add are only visible to you. This data will never be shared with other users of this
							service or anyone else. I built this for myself and I will mass-delete everything before I let my list of spots go public.
							
							If you want to share your sessions with friends - this is not for you. Close this and log onto Instagram or Facebook.
							If you only ever surf Muizenberg or Longbeach, this is not for you - log onto your webcams, it's far easier.

							Swell and wind conditions are courtesy of Magicseaweed - shout out for the generosity! 

						</h5>
					</div>
				</div>
				<Link to='/landing'>
					<button className="waves-effect orange darken-2 btn-large" style={{marginBottom: '150px'}}>
						Login with Google
					</button>
				</Link>
			<div className="ocean">
				<div className="wave2"></div>
				<div className="wave1"></div>
				<div className="wave3"></div>
			</div>
		</div>
		);
}

export default About;