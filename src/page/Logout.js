import {useContext, useEffect} from 'react'; 
import { Navigate, useNavigate } from 'react-router-dom'; 
import UserContext from '../userContext';

export default function Logout() {
	const { unsetUser, setUser, user } = useContext(UserContext);

	unsetUser();
	useEffect(() => {
		setUser({
			isAdmin: null,
			id: null
		})
	})
	return (
		<Navigate to="/Login" />
	)
}
