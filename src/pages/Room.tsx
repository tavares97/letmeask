import { useEffect } from 'react';
import { FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';

import logoImg from '../assets/images/logo.svg';
import Button from '../components/Button';
import Question from '../components/Question';
import RoomCode from '../components/RoomCode';

import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';

import '../styles/room.scss';

type RoomParams = {
	id: string;
};

type FirebaseQuestions = Record<
	string,
	{
		author: {
			name: string;
			avatar: string;
		};
		content: string;
		isAnswered: boolean;
		isHighlighted: boolean;
	}
>;

type QuestionType = {
	id: string;
	author: {
		name: string;
		avatar: string;
	};
	content: string;
	isAnswered: boolean;
	isHighlighted: boolean;
};

const Room = () => {
	const [newQuestion, setNewQuestion] = useState('');
	const [questions, setQuestions] = useState<QuestionType[]>([]);
	const [title, setTitle] = useState('');

	const params = useParams<RoomParams>();
	const { user } = useAuth();
	const roomId = params.id;

	useEffect(() => {
		//Busca a referencia da BD
		const roomRef = database.ref(`rooms/${roomId}`);

		//Busca as informações contidas dentro da referencia
		roomRef.on('value', room => {
			const firebaseQuestions: FirebaseQuestions = room.val().questions ?? {};

			const parsedQuestions = Object.entries(firebaseQuestions).map(
				(
					[key, value] //([key, value]) === (val) -> val[0], val[1]
				) => {
					return {
						id: key,
						content: value.content,
						author: value.author,
						isHighlighted: value.isHighlighted,
						isAnswered: value.isAnswered,
					};
				}
			);

			setTitle(room.val().title);
			setQuestions(parsedQuestions);
		});
	}, [roomId]);

	const handleSendQuestion = async (e: FormEvent) => {
		e.preventDefault();

		if (newQuestion.trim() === '') return;

		if (!user) throw new Error('Tem que estar logado para enviar uma pergunta');

		const question = {
			content: newQuestion,
			author: {
				name: user.name,
				avatar: user.avatar,
			},
			isHighlighted: false,
			isAnswered: false,
		};

		await database.ref(`rooms/${roomId}/questions`).push(question);

		setNewQuestion('');
	};

	return (
		<div id='page-room'>
			<header>
				<div className='content'>
					<img src={logoImg} alt='logo' />
					<RoomCode code={roomId} />
				</div>
			</header>

			<main>
				<div className='room-title'>
					<h1>Sala {title}</h1>
					{questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
				</div>

				<form onSubmit={handleSendQuestion}>
					<textarea
						placeholder='Faça a sua questão...'
						onChange={e => setNewQuestion(e.target.value)}
						value={newQuestion}
					/>
					<div className='form-footer'>
						{user ? (
							<div className='user-info'>
								<img src={user.avatar} alt={user.name} />
								<span>{user.name}</span>
							</div>
						) : (
							<span>
								Para enviar uma pergunta,
								<button>tem que estar autenticado</button>.
							</span>
						)}
						<Button type='submit' disabled={!user}>
							Enviar Pergunta
						</Button>
					</div>
				</form>

				<div className='question-list'>
					{questions.map(({ content, author, id }) => {
						return <Question content={content} author={author} key={id} />;
					})}
				</div>
			</main>
		</div>
	);
};

export default Room;
