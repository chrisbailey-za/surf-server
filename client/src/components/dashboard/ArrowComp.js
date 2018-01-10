import React from 'react';

export default ({ value }) => {

	return (
			<svg version="1.1" style={{width:'20px', height:'22px', margin:'-2px 0 0 -2px'}} viewBox="0 0 100 100">
				<g transform={"rotate("+value+",50,50) translate(0,5)"}>
					<path d="m50,0 -20,30 16,-3 -3,63 14,0 -3,-63 16,3 -20,-30z" style={{fill:"black", strokeWidth:"0"}}>
					</path>
				</g>
			</svg>
		);
};