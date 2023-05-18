import '../components/comp.css'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { useState, useEffect, useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import swal from 'sweetalert2';
import UserContext from '../userContext';

function Login() {

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const {user, setUser} = useContext(UserContext);

	const navigate = useNavigate();
	
	function login(e) {

		e.preventDefault();

		fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
			method: "POST",
			headers: {
				'Content-Type' : 'Application/json'
			},
			body: JSON.stringify({
				email: email, 
				password: password
			})
		})
		.then(res => res.json())
		.then(data => {

			console.log(data);

			if(typeof data.access !== "undefined") {
				localStorage.setItem('token', data.access)
				retrieveUserDetails(data.access)

				swal.fire({
					title: "Authentication Successful",
					icon: "success",
					text: "Login Successfully!"
				})

			navigate("/Dashboard/admin")

			} else {
				swal.fire({
					title: "Wrong Email or Password!",
					icon: "error",
					text: "Check your Email or Password and try again!"
				})
			}
		})

		const retrieveUserDetails = (token) => {

	    fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
	      headers: {
	        Authorization: `Bearer ${token}`
	      }
	    })
	    .then(res => res.json())
	    .then(data => {
	      console.log(data);
	      setUser({
	        id: data._id,
	        name: data.name,
	        email: data.email,
	        isAdmin: data.isAdmin
	      })
	    })
	  }
	}

  return (
  	(user.id !== undefined && user.id !== null) ?
  		(user.isAdmin === true) ?
			<Navigate to="/Dashboard/admin" />
			:
			<Navigate to="/Dashboard" />
		:
	  	<Container style={{height: "73vh"}}>
			<div style={{marginTop: "19vh"}} className="d-flex flex-row justify-content-center">
			    <Form onSubmit={e => login(e)} style={{background: "rgba(0, 0, 0, 0.2)", width: "30vw"}}
			     className="col-3 p-5 m-5 d-flex flex-column align-items-center">
			      <Form.Group style={{width: "35vh"}} className="mb-3" controlId="formBasicEmail">
			        <Form.Label>Email address: </Form.Label>
			        <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
			      </Form.Group>
			      <Form.Group style={{width: "35vh"}} className="mb-3" controlId="formBasicPassword">
			        <Form.Label>Password: </Form.Label>
			        <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
			      </Form.Group>
			      <Button variant="primary" type="submit">
			        Submit
			      </Button>
			    </Form>
		    </div>
	    </Container>
  );
}

export default Login;