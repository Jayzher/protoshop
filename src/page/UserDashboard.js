import DisplayProduct from '../components/DisplayProduct';
import '../components/comp.css';
import { useEffect, useContext } from 'react';
import { Container } from 'react-bootstrap';
import { useState } from 'react';
import {Nav, Navbar} from 'react-bootstrap';
import {Link, NavLink, Navigate} from 'react-router-dom'; 
import UserContext from '../userContext';


export default function UserDashboard() {

	const [products, setProducts] = useState([]);
	const {user, setUser} = useContext(UserContext);
	
	useEffect(() => {	

		fetch(`${process.env.REACT_APP_API_URL}/products/allproducts`)
		.then(res => res.json())
		.then(data => {
			setProducts(data.map(prods => {
				return(
					<>
						<DisplayProduct key={prods._Id} prods={ prods } />
					</> 
				)
			}))
		})
		if (user.id !== null) {
			document.getElementById("sideNav").style.display = "flex";		
		}
	})

	return (
		(user.id !== undefined && user.id !== null) ?
		<>
			<Container style={{height: "100%"}}>
				<div id="user-dash" style={{height: "100%"}} className="row" /*style={{overscrollBehaviorInline: "contain", overscrollBehaviorX: "contain", overflowX: "scroll"}}*/ className="d-flex flex-row mt-4 p-3">
					<div className="row" style={{height: "100%", marginLeft: "50px"}}>
						{products}
					</div>
				</div>
			</Container>
		</>
		:
		<Navigate to="/Logout" />
	)
}