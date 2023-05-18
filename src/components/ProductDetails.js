/*import Button from 'react-bootstrap/Button';
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
import OrderTable from './OrderTable';

export default function ProductDetails({ prods }) {

	const { orderId, product, description, quantity, price, productsId } = prods;

	const {user, setUser} = useContext(UserContext);
	const {orders, setOrders} = useContext(OrderContext);

	const { purchaseOn, totalAmount } = prods;

	const [ prod, setProd ] = useState(0);

	useEffect(() => {
		setOrders(prods.Orders);
	})

	return (
	<>
		<OrderTable />
	</>
	)
}*/

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

export default function ProductDetails({orders}) {
	// const {orders, setOrders} = useContext(OrderContext);

	const { orderId, Product, description, quantity, price, productsId, purchaseOn, Total } = orders;
	const {user, setUser} = useContext(UserContext);
	const [prodDesc, setDesc] = useState("");
	const [prodPrice, setPrice] = useState();

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
				productsId: productsId
			})
		})
		.then(res => res.json())
		.then(data => {
			setImage(data.image)
			setDesc(data.description)
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
		      <Modal.Title>{Product}</Modal.Title>
		    </Modal.Header>
		    <Modal.Body style={{background: "lightcyan"}}>
				<Card style={{ width: '100%', height: "500px", border: "solid 1px black"}} className="d-flex flex-column align-items-center pt-3">
			      <Card.Img variant="top" style={{width: '75%', height: "300px"}} src={image} />
			      <Card.Body>
			        <Card.Title>{Product}</Card.Title>
			        <Card.Text style={{textAlign: "justify"}}>
			          {prodDesc}
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
          	<td>{Product}</td>
         	<td>{purchaseOn}</td>
         	<td>{quantity}</td>
         	<td>{price}</td>
         	<td>{Total}</td>
         	<td>PENDING</td>
         	<td><button variant="primary"  onClick={ () => sets(productsId) }>Details</button></td>
         	<td><button variant="primary">Remove</button></td>
	 	</tr>
	</>
	)
}