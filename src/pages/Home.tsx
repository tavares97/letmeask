import { useHistory } from 'react-router-dom';

import illustrationSvg from '../assets/images/illustration.svg';
import logoSvg from '../assets/images/logo.svg';
import googleLogoSvg from '../assets/images/google-icon.svg';

import Button from '../components/Button';

import '../styles/auth.scss';
import { useAuth } from '../hooks/useAuth';
import { FormEvent, useState } from 'react';
import { database } from '../services/firebase';

const Home = () => {
	const history = useHistory();
	const { user, signInWithGoogle } = useAuth();
	const [roomCode, setRoomCode] = useState('');

	const handleCreateRoom = async () => {
		if (!user) {
			await signInWithGoogle();
		}
		history.push('/rooms/new');
	};

	const handleJoinRoom = async (e: FormEvent) => {
		e.preventDefault();

		//Verifica se o input está vazio
		if (roomCode.trim() === '') return;

		const roomRef = await database.ref(`rooms/${roomCode}`).get();

		//Verifica se o código de sala inserido existe na nossa DB
		if (!roomRef.exists()) {
			alert('Room não existe');
			return;
		}

		history.push(`rooms/${roomCode}`);
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
					<button className='create-room' onClick={handleCreateRoom}>
						<img src={googleLogoSvg} alt='Logo google' />
						Crie a sua sala com o google
					</button>

					<div className='separator'>Ou entre numa sala</div>

					<form onSubmit={handleJoinRoom}>
						<input
							type='text'
							placeholder='Insira o código da sala'
							onChange={e => setRoomCode(e.target.value)}
							value={roomCode}
						/>
						<Button type='submit'>Entre na sala</Button>
					</form>
				</div>
			</main>
		</div>
	);
};

export default Home;
