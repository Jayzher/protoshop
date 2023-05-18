import Table from 'react-bootstrap/Table';
import './comp.css';
import ProdContext from '../prodContext';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';


export default function ProductsTable({ prods }) {

	const { name, description, price, productsId, image } = prods;
	const [prodName, setName] = useState(name);
	const [prodDesc, setDescription] = useState(description);
	const [prodPrice, setPrice] = useState(price);
	const [prodImage, setImage] = useState(image);
	const [ isActive, setActive ] = useState(false);
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const [ prod, setProd ] = useState(0);

	useEffect(() => {
		if (name.length > 27) {
			Swal.fire({
				title: "Name is too long!",
				icon: "warning",
				text: "Change name to a shorter one."
			})
		}
	})

	const del = (prod) => {
			fetch(`http://localhost:4000/products/delete`, {
			method: "DELETE",
			headers: {
				'Content-Type' : 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({
				productsId: prod
			})
		})
	}

	function sets(e) {
		setShow(true);
		setProd(e);
	}

	function edit(e) {
		e.preventDefault();
			fetch("`${process.env.REACT_APP_API_URL}/products/update`", {
				method: "PUT",
				headers: {
					'Content-Type' : 'application/json',
					Authorization: `Bearer ${localStorage.getItem('token')}`
				},
				body: JSON.stringify({
					productsId: prod,
					name: prodName,
					description: prodDesc,
					price: prodPrice
				})
			})
			Swal.fire({
				title: "Product Updated!",
				icon: "success",
				text: "The Product Details is Successfully Modified!"
			})
		}

	return (
		<>
			  <Modal show={show} onHide={handleClose}>
			    <Modal.Header closeButton>
			      <Modal.Title>Modify Product</Modal.Title>
			    </Modal.Header>
			    <Modal.Body>
			      <Form name="myform" id="myform" onSubmit={e => edit(e)} style={{background: "rgba(0, 0, 0, 0.2)", width: "30vw"}}
				     className="col-3 p-5 d-flex m-3 flex-column align-items-center">
				     <Form.Group style={{width: "35vh"}} className="mb-3" controlId="formBasicEmail1">
				      	<Form.Control type="number" placeholder="" hidden value={prod}/>
				        <Form.Label>Product Image URL: </Form.Label>
				        <Form.Control type="text" placeholder="" value={prodImage} onChange={e => setImage(e.target.value)}/>
				      </Form.Group>
				      <Form.Group style={{width: "35vh"}} className="mb-3" controlId="formBasicEmail3">
				      	<Form.Control type="number" placeholder="" hidden value={prod}/>
				        <Form.Label>Product Name: </Form.Label>
				        <Form.Control type="text" placeholder="" value={prodName} onChange={e => setName(e.target.value)}/>
				      </Form.Group>
				      <Form.Group style={{width: "35vh"}} className="mb-3" controlId="formBasicEmail2">
				        <Form.Label>Description: </Form.Label>
				        <Form.Control type="text" placeholder="" value={prodDesc} onChange={e => setDescription(e.target.value)}/>
				      </Form.Group>
				      <Form.Group style={{width: "35vh"}} className="mb-3" controlId="formBasicPassword1">
				        <Form.Label>price: </Form.Label>
				        <Form.Control type="number" placeholder="" value={prodPrice} onChange={e => setPrice(e.target.value)}/>
				      </Form.Group>
					</Form>
			    </Modal.Body>
			    <Modal.Footer>
			      <Button variant="secondary" onClick={handleClose}>
			        Cancel
			      </Button>
			      <Button variant="primary" type="submit" form="myform" onClick={handleClose}>
			        Save Changes
			      </Button>
			    </Modal.Footer>
			  </Modal>
			<tr className="">
		 		<td>{productsId}</td>
	          	<td>{name}</td>
	         	<td className="align-items-center" style={{fontSize: "0.8rem"}}>{description}</td>
	         	<td>{price}</td>
	         	<td><button variant="primary"  onClick={ () => sets(productsId) } >Edit</button></td>
	         	<td><button variant="primary" onClick={ () => del(productsId) }>Remove</button></td>
		 	</tr>
		</>		   	    
	)
}