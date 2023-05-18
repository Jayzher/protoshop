import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import './comp.css';
import { Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import UserContext from '../userContext';

export default function DispalyProducts({ prods }) {

	const { name, description, price, productsId, image} = prods;
	const {user, setUser} = useContext(UserContext);
	const [prodName, setName] = useState(name);
	const [prodDesc, setDescription] = useState(description);
	const [prodPrice, setPrice] = useState(price);
	const [prodImage, setImage] = useState(image);
	const [quantity, setQuantity] = useState(0);
	const [ isActive, setActive ] = useState(false);
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const [ prod, setProd ] = useState(0);
  	

	function sets(e) {
		console.log("setProd - " + e);
		setShow(true);
		setProd(e);
	}

	function Order(e) {
		e.preventDefault();
		console.log("edit - " + e);
			fetch(`${process.env.REACT_APP_API_URL}/users/checkout`, {
				method: "POST",
				headers: {
					'Content-Type' : 'application/json',
					Authorization: `Bearer ${localStorage.getItem('token')}`
				},
				body: JSON.stringify({
					userId: user.id,
					productsId: prod,
					description: prodDesc,
					quantity: quantity,
					price: prodPrice
				})
			})
			Swal.fire({
				title: "Ordered Successfully!",
				icon: "success",
				text: "Thank you for Purchasing!"
			})
			console.log("prod - " + prod);
		}

		const popover = (
		  <Popover style={{background: "rgba(0, 0, 0, 0.7)"}} id="popover-basic">
		    <Popover.Body style={{ width: "100%"}}>
		      <Form name="thisForm" id="thisForm" onSubmit={e => Order(e)} style={{ width: "100%"}}>
			     <Form.Group style={{width: "100%"}} className="d-flex flex-column align-items-center" controlId="quantity">
			     	<Form.Label style={{color: "azure"}} className="fs-3">Quantity</Form.Label>
			        <Form.Control style={{backgroundColor: "lightcyan", width: "200px", display: "flex"}} type="number" placeholder="" value={quantity} onChange={e => setQuantity(e.target.value)}/>
			    	<Button style={{ marginTop: "10px"}} variant="primary" type="submit" form="thisForm" onClick={handleClose}>
			        Purchase
			  	 	</Button>
			     </Form.Group>
			  </Form>		  
		    </Popover.Body>
		  </Popover>
		);

	return (
	<>
		<Modal className="text-center" show={show} onHide={handleClose}>
		    <Modal.Header style={{textAlign: "center"}} className="d-flex flex-row justify-content-center" closeButton>
		      <Modal.Title>{name}</Modal.Title>
		    </Modal.Header>
		    <Modal.Body style={{background: "lightcyan"}}>
				<Card style={{ width: '100%', height: "500px", border: "solid 1px black"}} className="d-flex flex-column align-items-center pt-3">
			      <Card.Img variant="top" style={{width: '75%', height: "300px"}} src={image} />
			      <Card.Body>
			        <Card.Title>{name}</Card.Title>
			        <Card.Text style={{textAlign: "justify"}}>
			          {description}
			        </Card.Text>
			      </Card.Body>
			    </Card>
		    </Modal.Body>
		    <Modal.Footer style={{textAlign: "justify"}} className="d-flex flex-row justify-content-center">
		      <Button variant="secondary" style={{border: "solid 2px black"}} className="me-3 pl-3 pr-3" onClick={handleClose}>
		        Back
		      </Button>
		      <OverlayTrigger trigger="click" variant="dark" placement="top" overlay={popover}>
		    	<Button style={{border: "solid 2px black"}} className="pl-3 pr-3" variant="secondary">Place Order</Button>
		  	  </OverlayTrigger>
		    </Modal.Footer>
		</Modal>
        <div className="col-3 mt-4">
			<Card className="d-flex align-items-center pt-4" style={{ height: "400px", width: '250px', background: "lightcyan", border: "solid 2px black" }}>
		      <Card.Img style={{maxHeight: "110px", width: "75%", objectFit: "fill", objectPosition: "50% 50%"}} variant="top" src={image} />
		      <Card.Body className="w-100 mt-2 opacity d-block" style={{height: "300px", overflow: "hidden"}}>
		        <Card.Title style={{fontSize: "1rem"}} className="text-center">{name}</Card.Title>
		        <Card.Text  style={{textAlign: "justify", fontSize: "0.9rem", textOverflow: "ellipsis"}}>
		          {description}
		        </Card.Text>
		      </Card.Body>
		      <div style={{height: "60px", background: "black"}} className="w-100 d-flex flex-column align-items-center">
		      	<Card.Text style={{color: "azure", fontSize: "1rem", marginBottom: "0px"}} className="fw-bold">
		          &#8369;{price}
		      	</Card.Text>
		      	 <Button style={{fontSize: "0.8rem", marginTop: "0", marginBottom: "20px"}} variant="primary" type="button" onClick={() => sets(productsId)}>Checkout</Button>
		      </div>
		    </Card>
		</div>
	</>
	)
}