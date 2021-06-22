import { useHistory } from 'react-router-dom';

import illustrationSvg from '../assets/images/illustration.svg';
import logoSvg from '../assets/images/logo.svg';
import googleLogoSvg from '../assets/images/google-icon.svg';

import Button from '../components/Button';

import '../styles/auth.scss';

const Home = () => {
	const history = useHistory();

	const newRoom = () => {
		history.push('/rooms/new');
	};

	return (
		<div id='page-auth'>
			<aside>
				<img src={illustrationSvg} alt='illustration' />
				<strong>Crie salas para Q&amp;A ao vivo</strong>
				<p>Tire duvidas ou partilhe conhecimento na sua sala em tempo real</p>
			</aside>
			<main>
				<div className='main-content'>
					<img src={logoSvg} alt='Logo' />
					<button className='create-room' onClick={newRoom}>
						<img src={googleLogoSvg} alt='Logo google' />
						Crie a sua sala com o google
					</button>

					<div className='separator'>Ou entre numa sala</div>

					<form>
						<input type='text' placeholder='Insira o código da sala' />
						<Button type='submit'>Entre na sala</Button>
					</form>
				</div>
			</main>
		</div>
	);
};

export default Home;
