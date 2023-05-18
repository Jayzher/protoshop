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
import OrderContext from '../orderContext';

export default function OrderTable() {

	const {orders, setOrders} = useContext(OrderContext);

	const { orderId, product, description, quantity, price, productsId } = orders;

	const {user, setUser} = useContext(UserContext);

	const { purchaseOn, total } = orders;

	const [image, setImage] = useState("");

	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const [ prod, setProd ] = useState(0);

	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}/products/check`, {
			method: "POST",
			headers: { 
				'Content-Type' : 'application/json'
			},
			body: JSON.stringify({
				name: product
			})
		})
		.then(res => res.json())
		.then(data => {
			setImage(data.image)
		})
	})

	function sets(e) {
		setShow(true);
		setProd(e);
	}

	return (
	<>
		<Modal className="text-center" show={show} onHide={handleClose}>
		    <Modal.Header style={{textAlign: "center"}} className="d-flex flex-row justify-content-center" closeButton>
		      <Modal.Title>{product}</Modal.Title>
		    </Modal.Header>
		    <Modal.Body style={{background: "lightcyan"}}>
				<Card style={{ width: '100%', height: "500px", border: "solid 1px black"}} className="d-flex flex-column align-items-center pt-3">
			      <Card.Img variant="top" style={{width: '75%', height: "300px"}} src={image} />
			      <Card.Body>
			        <Card.Title>{product}</Card.Title>
			        <Card.Text style={{textAlign: "justify"}}>
			          {description}
			        </Card.Text>
			      </Card.Body>
			    </Card>
		    </Modal.Body>
		    <Modal.Footer className="d-flex flex-row justify-content-center">
		      <Button variant="secondary" style={{border: "solid 2px black"}} className="me-3" onClick={handleClose}>
		       	Close
		      </Button>
		    </Modal.Footer>
		</Modal>
		<tr className="">
	 		<td>{orderId}</td>
          	<td>{product}</td>
         	<td>{purchaseOn}</td>
         	<td>{quantity}</td>
         	<td>{price}</td>
         	<td>{total}</td>
         	<td><button variant="primary"  onClick={ () => sets(productsId) }>Details</button></td>
         	<td><button variant="primary">Remove</button></td>
	 	</tr>
	</>
	)
}