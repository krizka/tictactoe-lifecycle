import React from 'react';
import './GameGrid.css';

const GameGrid = ( { layout } ) => {
	return (
		<div className="square-container">
			<div className="square tc dib br3 pa3 bw2 shadow-5 white">
				<div className="content" id={0} key={0}>
					{layout[0]}
				</div>
			</div>
			<div className="square tc dib br3 pa3 bw2 shadow-5 white">
				<div className="content" id={1} key={1}>
					{layout[1]}
				</div>
			</div>
			<div className="square tc dib br3 pa3 bw2 shadow-5 white">
				<div className="content" id={2} key={2}>
					{layout[2]}
				</div>
			</div>
			<div className="square tc dib br3 pa3 bw2 shadow-5 white">
				<div className="content" id={3} key={3}>
					{layout[3]}
				</div>
			</div>
			<div className="square tc dib br3 pa3 bw2 shadow-5 white">
				<div className="content" id={4} key={4}>
					{layout[4]}
				</div>
			</div>
			<div className="square tc dib br3 pa3 bw2 shadow-5 white">
				<div className="content" id={5} key={5}>
					{layout[5]}
				</div>
			</div>
			<div className="square tc dib br3 pa3 bw2 shadow-5 white">
				<div className="content" id={6} key={6}>
					{layout[6]}
				</div>
			</div>
			<div className="square tc dib br3 pa3 bw2 shadow-5 white">
				<div className="content" id={7} key={7}>
					{layout[7]}
				</div>
			</div>
			<div className="square tc dib br3 pa3 bw2 shadow-5 white">
				<div className="content" id={8} key={8}>
					{layout[8]}
				</div>
			</div>
		</div>
	);
};

export default GameGrid;