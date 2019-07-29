import React from 'react';
import './Lobby.css';

const Lobby = ( { waiting, onFindGameSubmit, searchDots } ) => {
	return (
		<article className="article2 center">
			<div className="">
					<h1 className="h12">-	 PVP TIC TAC TOE	 -</h1>
					<h2 className="h12 h14">LOBBY</h2>
					<div className='gameGrid'>
						{!waiting ? 
						<button
							className='button12'
							disabled={waiting}
							onClick={onFindGameSubmit}>
							FIND GAME
						</button>
						: 
						<h1 className="h13">SEARCHING FOR GAME{'.'.repeat(searchDots)}</h1>}
				</div>
			</div>
			<div className="pad"></div>
		</article>
	);
};


export default Lobby;