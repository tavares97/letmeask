import { useState } from 'react';
import { FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';

import illustrationSvg from '../assets/images/illustration.svg';
import logoSvg from '../assets/images/logo.svg';

import Button from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';

import '../styles/auth.scss';

const NewRoom = () => {
	//Acesso ao user Autenticado
	const { user } = useAuth();
	const history = useHistory();
	const [newRoom, setNewRoom] = useState('');

	const handleCreateRoom = async (e: FormEvent) => {
		e.preventDefault();

		if (newRoom.trim() === '') return;

		//Cria uma referencia no firebase com o nome 'rooms'
		const roomRef = database.ref('rooms');
		//Adiciona uma nova 'room' dentro dessa referencia
		const firebaseRoom = await roomRef.push({
			title: newRoom,
			authorId: user?.id,
		});

		history.push(`rooms/${firebaseRoom.key}`);
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
					<h2>Crie uma nova sala</h2>

					<form onSubmit={handleCreateRoom}>
						<input
							type='text'
							placeholder='Nome da sala'
							onChange={e => setNewRoom(e.target.value)}
							value={newRoom}
						/>
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
