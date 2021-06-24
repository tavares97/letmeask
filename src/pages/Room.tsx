import logoImg from '../assets/images/logo.svg';
import Button from '../components/Button';

import '../styles/room.scss';

const Room = () => {
	return (
		<div id='page-room'>
			<header>
				<div className='content'>
					<img src={logoImg} alt='logo' />
					<div>codigo sala</div>
				</div>
			</header>

			<main>
				<div className='room-title'>
					<h1>sala react</h1>
					<span>4 perguntas</span>
				</div>

				<form>
					<textarea placeholder='Faça a sua questão?' />
					<div className='form-footer'>
						<span>
							Para enviar uma pergunta,
							<button>tem que estar autenticado</button>.
						</span>
						<Button type='submit'>Enviar Pergunta</Button>
					</div>
				</form>
			</main>
		</div>
	);
};

export default Room;
