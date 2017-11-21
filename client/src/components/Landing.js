import React from 'react';

const Landing = () => {

	return(
		<div style={{textAlign: 'center'}}>
				<h1 style={{paddingTop: '1%'}}>
					SurfApp
				</h1>
				<div className='row'>
					<div className='col s10 m10 l10 xl6 push-s1 push-m1 push-l1 push-xl3'>
						<h5 style={{fontSize: '1.5em'}}>
							Harness the power of technology to help you get schacked and avoid getting skunked! <br></br><br></br>
							By logging your surfs, you keep track of what works when and get alerted when it works again.
						</h5>
					</div>
				</div>
				<div className='row hide-on-small-only'>
					<div className='col s12 m10 l10 xl6 push-m1 push-l1 push-xl3'>
						<p className="flow-text" style={{fontSize: '1em'}}>
							Before you freak out, this will never tell the incompetent masses to go surf your favourite secret-spot!
						</p>
					</div>
				</div>
				<a href='/auth/google'>
					<button className="waves-effect orange darken-2 btn-large" style={{marginBottom: '150px'}}>
						Login with Google
					</button>
				</a>
			<div className="ocean">
				<div className="wave2"></div>
				<div className="wave1"></div>
				<div className="wave3"></div>
			</div>
		</div>
		);
}

export default Landing;