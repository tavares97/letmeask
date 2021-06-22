import { Link } from 'react-router-dom';

import illustrationSvg from '../assets/images/illustration.svg';
import logoSvg from '../assets/images/logo.svg';

import Button from '../components/Button';

import '../styles/auth.scss';

const NewRoom = () => {
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
					<h2>Crie uma nova sala</h2>

					<form>
						<input type='text' placeholder='Nome da sala' />
						<Button type='submit'>Criar sala</Button>
					</form>
					<p>
						Quer entrar numa sala existente ? <Link to='/'>Clique aqui</Link>
					</p>
				</div>
			</main>
		</div>
	);
};

export default NewRoom;
