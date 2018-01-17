import React from 'react';

export default ({ showEvery, setEvery }) => {

	return (
			<div className="row hide-on-small-only">		
				<a className={showEvery===1?"btn-flat white-text cyan darken-2":"btn-flat white-text grey lighten-1"} style={{padding:'0 1.5rem'}} onClick={() => setEvery(1)}>1</a>
				<a className={showEvery===2?"btn-flat white-text cyan darken-2":"btn-flat white-text grey lighten-1"} style={{padding:'0 1.5rem'}} onClick={() => setEvery(2)}>2</a>
				<a className={showEvery===3?"btn-flat white-text cyan darken-2":"btn-flat white-text grey lighten-1"} style={{padding:'0 1.5rem'}} onClick={() => setEvery(3)}>3</a>
				<a className={showEvery===6?"btn-flat white-text cyan darken-2":"btn-flat white-text grey lighten-1"} style={{padding:'0 1.5rem'}} onClick={() => setEvery(6)}>6</a>
			</div>
		);
};