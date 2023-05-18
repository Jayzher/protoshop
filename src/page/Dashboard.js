import '../components/comp.css'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { useState, useEffect, useContext } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Products from './Products';
import Table from 'react-bootstrap/Table';
import UserContext from '../userContext';
import ProductsTable from '../components/ProductsTable';
import SideNavBar from '../components/SideNavBar';

export default function Dashboard() {

		const [name, setName] = useState("");
		const [description, setDescription] = useState("");
		const [price, setPrice] = useState();
		const [image, setImage] = useState();
		const navigate = useNavigate();
		const { user, setUser } = useContext(UserContext);
		const [text, setText] = useState("");
		const [ isActive, setActive] = useState(true);

		useEffect(() => {
			if (user.id === undefined || user.id === null) {
				navigate("/Login");
			}
			if (name.length > 27) {
				Swal.fire({
					title: "Name is too long!",
					icon: "warning",
					text: "Change name to a shorter one (max - 27 Characters)"
				})
				setText("Change to a shorter name");
				setName("");
			}
		})

	function edit(prod) {
			fetch(`${process.env.REACT_APP_API_URL}/update/${prod}`, {
				method: "PUT",
				headers: {
					'Content-Type' : 'application/json',
					Authorization: `Bearer ${localStorage.getItem('token')}`
				},
				body: JSON.stringify({
					name: name,
					description: description,
					price: price
				})
			})
		}

	function create(e) {
		e.preventDefault();

		fetch('http://localhost:4000/products/create', {
			method: "POST",
			headers: {
				'Content-Type' : 'Application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({
				image: image,
				name: name,
				description: description,
				price: price
			})
		})
		.then(res => res.json())
		.then(data => {

			console.log(data);

			Swal.fire({
				title: "Created Successfully",
				icon: "success",
				text: "The Product is now Availabe"
			})
			setName("");
			setDescription("");
			setPrice('');
			setImage('');
		})
	}

	return (
			(user.isAdmin === true) ?
			<div className="m-0 p-0">
				<div style={{height: "", width: "100%"}}>
					<h1 style={{textAlign: "center"}} className="pt-5">Create Product</h1>
					<Container style={{}} className="d-flex flex-row p-5">
					    <div style={{height: "100%"}}>
					    	<Form onSubmit={e => create(e)} style={{background: "rgba(0, 0, 0, 0.2)", width: "30vw"}}
							     className="col-3 p-5 d-flex m-3 flex-column align-items-center">
							     <Form.Group style={{width: "35vh"}} className="mb-3" controlId="formBasicEmail1">
							        <Form.Label>Product Image URL: <br/> *Leave empty for default </Form.Label>
							        <Form.Control type="text" placeholder="e.g https://i.pinimg.com/originals/02/ff/54/02ff54b90f6e832d7eabe42feb53f4e6.jpg" value={image} onChange={e => setImage(e.target.value)}/>
							      </Form.Group>
							      <Form.Group style={{width: "35vh"}} className="mb-3" controlId="formBasicEmail1">
							        <Form.Label>Product Name: </Form.Label>
							        <Form.Control type="text" placeholder={text} value={name} onChange={e => setName(e.target.value)}/>
							      </Form.Group>
							      <Form.Group style={{width: "35vh"}} className="mb-3" controlId="formBasicEmail2">
							        <Form.Label>Description: </Form.Label>
							        <Form.Control type="text" placeholder="" value={description} onChange={e => setDescription(e.target.value)}/>
							      </Form.Group>
							      <Form.Group style={{width: "35vh"}} className="mb-3" controlId="formBasicPassword">
							        <Form.Label>price: </Form.Label>
							        <Form.Control type="number" placeholder="" value={price} onChange={e => setPrice(e.target.value)}/>
							      </Form.Group>
							      <Button variant="primary" type="submit">
							        Submit
							      </Button>
							</Form>
					    </div>
					    <div style={{height: "520px", overflowY: "auto"}}>
					    	<div className="ms-5 h-75 mb-5 mt-3">
					    		<Products />
					    	</div>
					    </div>
					</Container>
			    </div>
		    </div>
		    :
		    <Navigate to="/UserDashboard "/>
	)
}