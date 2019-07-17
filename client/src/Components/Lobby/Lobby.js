import React from 'react';
import './Lobby.css';

const Lobby = ( { waiting, onFindGameSubmit } ) => {
	return (
		<article className="article2 br3 ba b--black-10 mv4 mw6 shadow-5 center">
			<main className="pa4 black-80">
				<div className="center">
					<h1 className="f1 fw6 ph0 mh0">Lobby</h1>
					<div className='gameGrid'>
						{!waiting ? 
						<button
							className='w-40 grow link br2 pv2 white bg-orange'
							disabled={waiting}
							onClick={onFindGameSubmit}>
							Find Game
						</button>
						: 
						<h1 className="">Searching For Game...</h1>}
				</div>
				</div>
			</main>
		</article>
	);
};


export default Lobby;