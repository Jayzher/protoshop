import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect, useContext } from 'react';
import UserContext from '../userContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function Register(){

	const {user, setUser} = useContext(UserContext);
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [Password1, setPassword1] = useState("");
	const [Password2, setPassword2] = useState("");
	const [isActive, setIsActive] = useState(false);

	useEffect (() => {
		if ((email !== '' && Password1 !== '' && Password2 !== '' && name !== '') && (Password1 === Password2)){
			setIsActive(true);
		} else {
			setIsActive(false);
		}

		if (user.id !== null && user.id !== undefined) {
        <Navigate to="/Register" />
      }

		fetch(`${process.env.REACT_APP_API_URL}/users/check`, {
			method: "POST",
			headers: {
				'Content-Type' : 'application/json',
			},
			body: JSON.stringify({
				email: email
			})
		})
		.then(res => res.json())
		.then(data => {
			if (data) {
				Swal.fire({
				title: "Email is already taken",
				icon: "error",
				text: "Please try again."
				})
			}
		})
	})

	function registerUser(e) {
		e.preventDefault();

		localStorage.setItem("email", email)

		fetch('http://localhost:4000/users/register', {
			method: "POST",
			headers: {
				'Content-Type' : 'application/json',
			},
			body: JSON.stringify({
				name : name,
				email : email,
    		password : Password2
			})
		})
		.then(res => res.json())
		.then(data => {
			if(data === true) {
				Swal.fire({
					title: "Registered!",
					icon: "success",
					text: "You have Successfully Registered."
				})
			navigate("/Login");
			}
		})

		setName('');
		setEmail('');
		setPassword1('');
		setPassword2('');
	}

  return (
  	<Container style={{height: "87vh"}}>
			<div style={{marginTop: "5vh", height: "80vh"}} className="d-flex flex-row justify-content-center">
		    <Form onSubmit={e => registerUser(e)} style={{background: "rgba(0, 0, 0, 0.2)", width: "30vw"}}
		     className="col-3 p-5 m-5 d-flex flex-column align-items-center">
		      <Form.Group style={{width: "35vh"}} className="mb-3" controlId="formBasicEmail">
		        <Form.Label>Name: </Form.Label>
		        <Form.Control type="text" placeholder="Enter Name" value={name} onChange={e => setName(e.target.value)}/>
		      </Form.Group>
		      <Form.Group style={{width: "35vh"}} className="mb-3" controlId="formBasicEmail">
		        <Form.Label>Email address: </Form.Label>
		        <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)}/>
		      </Form.Group>
		      <Form.Group style={{width: "35vh"}} className="mb-3" controlId="formBasicPassword">
		        <Form.Label>Password: </Form.Label>
		        <Form.Control type="password" placeholder="Password" value={Password1} onChange={e => setPassword1(e.target.value)}/>
		      </Form.Group>
		      <Form.Group style={{width: "35vh"}} className="mb-3" controlId="formBasicPassword">
		        <Form.Label>Verify Password: </Form.Label>
		        <Form.Control type="password" placeholder="Verify Password" value={Password2} onChange={e => setPassword2(e.target.value)}/>
		      </Form.Group>
		        {
			      	isActive ?
			      	<Button variant="primary" type="submit" id="submitBtn">
			        Submit
			      	</Button>
			      	:
			      	<>
				      	<Button variant="danger" type="submit" id="submitBtn" disabled>
				        Submit
				      	</Button>
				      	<p id="myConfirm" style={{display: "inline"}} className="text-center mt-2">Your email and password do not match. Please try again.</p>
				    </>    
				}
		    </Form>
	    </div>
    </Container>
  );
}