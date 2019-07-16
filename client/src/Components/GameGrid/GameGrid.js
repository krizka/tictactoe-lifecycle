import React from 'react';
import './GameGrid.css';


const GameGrid = ( { layout } ) => {

	const theGrid = number => { 
	 	if (Math.sqrt(number) % 1 !== 0 || number < 9) throw `Error: parameter number must be a square number larger than or equal to 9`;
	 	let result = [];
		for (let i = 0; i < number; i++) {
			result.push(<div className="square tc dib br3 pa3 bw2 shadow-5 white"><div className="content" id={i} key={i}>{layout[i]}</div></div>);
		};
		return result;
	};

	return (
		<article className="article1 br4 shadow-5 center">
			<div className="h11">
				<h1 className="h11 center">Tic Tac Toe</h1>
			</div>
			<div className="square-container">
				{theGrid(9)};
			</div>
		</article>
	);
};

export default GameGrid;