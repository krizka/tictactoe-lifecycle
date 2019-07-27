import React from 'react';
import './GameGrid.css';


const GameGrid = ( { game, path, makeMove, returnToLobby } ) => {

  const makeMove2 = (e) => {
    console.log("ok so ", e.target.id);
  };

	const theGrid = number => { 
	 	if (Math.sqrt(number) % 1 !== 0 || number < 9) throw `Error: parameter number must be a square number larger than or equal to 9`;
		let classNameWinning = `square tc dib black`;
		let classNameNormal = `square tc dib white`;
	 	let result = [];
		for (let i = 0; i < number; i++) {
			let squareClass = game.result.pattern.indexOf(i) !== -1 ? classNameWinning : classNameNormal;
			result.push(<div className={squareClass} key={i} id={i} onClick={makeMove}>
								<div className="content">{game.layout[i]}</div>
						</div>);
		};
		console.log(result);
		return result;
	};

	let msg = ((game.result.state) ?
		game.result.state
		.replace(/-/g, ` `)
		.replace(/\w/, x => x.toUpperCase()) + `!` 
		: `${game.turn ? `Your` : `Opponent's`} turn`).toUpperCase();

	return (
			<div className="game-page-container ">
				<div className="game-page-item">
					<h1 className="h11">{msg}</h1>
				</div>
				<div className="game-page-item">
					<div className="gamegrid-container">
						{theGrid(9)}
				 	</div>
				</div>
				<div className="game-page-item">
					{path === 'gameOver' ?
						<button
							className='button1'
							onClick={returnToLobby}>
							RETURN TO LOBBY
						</button> : <div className="main"></div>}
				</div>
			</div>
	);
};

export default GameGrid;


			// <div className="game-page-container center">
			// 	<div className="game-page-item">
			// 		<h1 className="h11 center game-page-item">{msg}</h1>
			// 	</div>
			// 	<div className="game-page-item">
			// 		<div className="gamegrid-container">
			// 			{theGrid(9)}
			// 	 	</div>
			// 	</div>
			// 	<div className="game-page-item">
			// 		{path === 'gameOver' ?
			// 			<div className="center game-page-item">
			// 				<button
			// 					className='w-100 grow f4 link br2 mv4 pv2 dib white bg-orange'
			// 					onClick={returnToLobby}>
			// 					Return To Lobby
			// 				</button>
			// 			</div> : ''}
			// 	</div>
			// </div>