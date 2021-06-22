import { createContext, ReactNode, useEffect, useState } from 'react';
import { firebase, auth } from '../services/firebase';

type User = {
	id: string;
	name: string | null;
	avatar: string | null;
};

type AuthContextType = {
	user: User | undefined;
	signInWithGoogle: () => Promise<void>;
};

type AuthContextProviderProps = {
	children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

const AuthContextProvider = (props: AuthContextProviderProps) => {
	const [user, setUser] = useState<User>();

	//Verifica se o user tem 'displayName' ou 'photoUrl' na conta, senão da erro
	const error = (displayName: string | null, photoURL: string | null) => {
		if (!displayName || !photoURL) {
			throw new Error('Missing information from Google');
		}
	};

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(user => {
			if (user) {
				if (user) {
					const { displayName, photoURL, uid } = user;
					//Verifica se o user tem 'displayName' ou 'photoUrl' na conta, senão da erro
					error(displayName, photoURL);

					setUser({
						id: uid,
						name: displayName,
						avatar: photoURL,
					});
				}
			}
		});

		return () => {
			unsubscribe();
		};
	}, []);

	const signInWithGoogle = async () => {
		//Começa o processo de sign in com o google
		const provider = new firebase.auth.GoogleAuthProvider();
		//Faz a autenticação através de pop-up
		const res = await auth.signInWithPopup(provider);
		//Verifica se o user existe
		if (res.user) {
			const { displayName, photoURL, uid } = res.user;
			//Verifica se o user tem 'displayName' ou 'photoUrl' na conta, senão da erro
			error(displayName, photoURL);

			setUser({
				id: uid,
				name: displayName,
				avatar: photoURL,
			});
		}
	};

	return (
		<AuthContext.Provider value={{ user, signInWithGoogle }}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthContextProvider;
