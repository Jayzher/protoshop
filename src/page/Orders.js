import { useState, useEffect, useContext } from 'react';
// import CourseData from '../data/CourseData';
import ProductsTable from '../components/ProductsTable';
import Table from 'react-bootstrap/Table';
import ProdContext from '../prodContext';
import ProductDetails from '../components/ProductDetails';
import UserContext from '../userContext';
import OrderTable from '../components/OrderTable';
import { Navigate } from 'react-router-dom';

export default function Orders() {

	const [orders, setOrders] = useState([]);
	const [products, setProducts] = useState([]);
	const [func, setFunct] = useState();
	const {user, setUser} = useContext(UserContext);
	const { name } = user;

	useEffect(() => {
		if (user.id !== null && user.id !== undefined) {
				<Navigate to="/Logout" />
      }

		fetch(`${process.env.REACT_APP_API_URL}/users/orders`, {
			method: "POST",
			headers: { 
				'Content-Type' : 'application/json'
			},
			body: JSON.stringify({
				name: name
			})
		})
		.then(res => res.json())
		.then(data => {
			setOrders(data.Orders.map(res => {
				return(
					 <ProductDetails key={res._id} orders={res} /> 
				)
			}))
		})
	})

	return (
		<div className="mt-5 ms-5" style={{height: "100vh"}}>
			<Table style={{}} striped bordered hover id="myTable" className="opacity text-center">
			<thead>
				<tr>
		          <th>Name</th>
		          <th>Time of Purchase</th>
		          <th>Quantity</th>
		          <th>Price</th>
		          <th>Total Amount</th>
		          <th>Status</th>
		          <th>Product Details</th>
		          <th>Remove Order</th>
		        </tr>
		    </thead>
			<tbody style={{width: "50px"}}>
				{orders}
			</tbody>
		</Table>
		</div>
	)
}