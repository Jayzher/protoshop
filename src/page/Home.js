import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import UserContext from '../userContext';
import { useContext } from 'react';


export default function Home() {

	const {user, setUser} = useContext(UserContext);

	return (
		<Navigate to="/Dashboard" />
	)
}