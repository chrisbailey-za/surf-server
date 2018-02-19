import React from 'react';

const RatingLabels = () => {
		return(
				<div className='col' style={{textAlign:'center', cursor:'move'}}>
					<div className="row valign-wrapper" style={{marginBottom:'0px', paddingTop:'3px', border:'lightgrey', borderStyle: 'solid', borderWidth:'1px', backgroundColor: 'grey'}}>
			  		<div className="col" style={{width: '85px', height:'22px', overflow:'hidden'}}>Day</div>
			  	</div>
			  	<div className="row valign-wrapper" style={{marginBottom:'0px', paddingTop:'3px', border:'lightgrey', borderStyle: 'solid', borderWidth:'1px', backgroundColor: 'grey'}}>
			  		<div className="col" style={{width: '85px', height:'22px', overflow:'hidden'}}>Date</div>
			  	</div>
			  	<div className="row valign-wrapper" style={{marginBottom:'0px', paddingTop:'3px', border:'lightgrey', borderStyle: 'solid', borderWidth:'1px', backgroundColor: 'grey'}}>
			  		<div className="col" style={{width: '85px', height:'22px', overflow:'hidden'}}>Time</div>
			  	</div>
					<div className="row valign-wrapper" style={{marginBottom:'0px', paddingTop:'3px', border:'lightgrey', borderStyle: 'solid', borderWidth:'1px', backgroundColor: 'grey'}}>
			  		<div className="col" style={{width: '85px', height:'22px', overflow:'hidden'}}>Rating</div>
			  	</div>
			  	<div className="row valign-wrapper" style={{marginBottom:'0px', paddingTop:'3px', border:'lightgrey', borderStyle: 'solid', borderWidth:'1px', backgroundColor: 'grey'}}>
			  		<div className="col" style={{width: '85px', height:'22px', overflow:'hidden'}}>Swell Rating</div>
			  	</div>
			  	<div className="row valign-wrapper" style={{marginBottom:'0px', paddingTop:'3px', border:'lightgrey', borderStyle: 'solid', borderWidth:'1px', backgroundColor: 'grey'}}>
			  		<div className="col" style={{width: '85px', height:'22px', overflow:'hidden'}}>Wind Rating</div>
			  	</div>
			  	<div className="row valign-wrapper" style={{marginBottom:'0px', paddingTop:'3px', border:'lightgrey', borderStyle: 'solid', borderWidth:'1px', backgroundColor: 'grey'}}>
			  		<div className="col" style={{width: '85px', height:'22px', overflow:'hidden'}}>Tide Rating</div>
			  	</div>
			</div>
		)
}

export default RatingLabels;