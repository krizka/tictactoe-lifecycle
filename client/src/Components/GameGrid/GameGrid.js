import React from 'react';
import './GameGrid.css';


const GameGrid = ( { game, path, makeMove, returnToLobby } ) => {

	const theGrid = number => { 
	 	if (Math.sqrt(number) % 1 !== 0 || number < 9) throw `Error: parameter number must be a square number larger than or equal to 9`;
		let classNameWinning = `square tc dib br3 pa3 bw2 shadow-5 black`;
		let classNameNormal = `square tc dib br3 pa3 bw2 shadow-5 white`;
	 	let result = [];
		for (let i = 0; i < number; i++) {
			let squareClass = game.result.pattern.indexOf(i) !== -1 ? classNameWinning : classNameNormal;
			result.push(<div className={squareClass} key={'m'+i}>
							<div className="content" id={i} key={'c'+i} onClick={makeMove}>
								{game.layout[i]}
							</div>
						</div>);
		};
		return result;
	};

	let msg = (game.result.state) ?
		game.result.state
		.replace(/-/g, ` `)
		.replace(/\w/, x => x.toUpperCase()) + `!` 
		: `${game.turn ? `Your` : `Opponent's`} turn`;

	return (
		<article className="article1 br4 shadow-5 center">
			<div className="h11">
				<h1 className="h11 center">Tic Tac Toe</h1>
			</div>
			<div className="square-container">
				{theGrid(9)};
				{path === 'gameOver' ?
					<button
						className='w-100 grow f4 link br2 mv4 pv2 dib white bg-orange'
						onClick={returnToLobby}>
						Return To Lobby
					</button> : ''
		        }
			</div>
		</article>
	);
};

export default GameGrid;