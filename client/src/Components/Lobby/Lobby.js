import React from 'react';
import './Lobby.css';

const Lobby = ( { waiting, onFindGameSubmit } ) => {
	return (
		<article className="article2 br3 ba b--black-10 mv4 mw6 shadow-5 center">
			<main className="pa4 black-80">
				<div className="center">
					<h1 className="h12">LOBBY</h1>
					<div className='gameGrid'>
						{!waiting ? 
						<button
							className='button1'
							disabled={waiting}
							onClick={onFindGameSubmit}>
							FIND GAME
						</button>
						: 
						<h1 className="h13">SEARCHING FOR GAME</h1>}
				</div>
				</div>
			</main>
		</article>
	);
};


export default Lobby;