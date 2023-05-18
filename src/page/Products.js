import { useState, useEffect, useContext } from 'react';
// import CourseData from '../data/CourseData';
import ProductsTable from '../components/ProductsTable';
import Table from 'react-bootstrap/Table';
import ProdContext from '../prodContext';
import DisplayProduct from '../components/DisplayProduct';
import UserContext from '../userContext';
import { Navigate } from 'react-router-dom';

export default function Products() {

	const {user, setUser} = useContext(UserContext);
	const [products, setProducts] = useState([]);
	const {myProducts, setMyProducts} = useContext(ProdContext);

	useEffect(() => {

		if (user.id !== null && user.id !== undefined) {
				<Navigate to="/Logout" />
      }

		fetch(`${process.env.REACT_APP_API_URL}/products/allproducts`)
		.then(res => res.json())
		.then(data => {
			setMyProducts(data);
			setProducts(data.map(prod => {
				return(
					<>
						<ProductsTable key={prod._id} prods={ prod } />
					</> 
				)
			}))
		})
	})

	return (
		<Table style={{}} striped bordered hover id="myTable" className="opacity text-center">
			<thead>
				<tr>
		          <th>Id</th>
		          <th>Name</th>
		          <th>Description</th>
		          <th>Price</th>
		          <th>Edit Product</th>
		          <th>Delete Product</th>
		        </tr>
		    </thead>
			<tbody style={{width: "50px"}}>
				{ products }
			</tbody>
		</Table>
	)
}

/*export default function Products() {
	return (
		<div style={{top: "100vh"}} className="">
			<table className="" style={{width: "60vw"}}>
		    	<thead className="text-center fs-1">Product List</thead>
		    	<tbody>
		    		<th className="text-center">Name</th>
		    		<th className="text-center">Description</th>
		    		<th className="text-center">Price</th>
		    		<tr>
		    			<td className="border-1">{prodName}</td>
		    			<td className="border-1">{prodDesc}</td>
		    			<td className="border-1">{prodPrice}</td>
		    		</tr>
		    		<tr>
		    			<td className="border-1"> </td>
		    			<td className="border-1"> </td>
		    			<td className="border-1">0</td>
		    		</tr>
		    		<tr>
		    			<td className="border-1"> </td>
		    			<td className="border-1"> </td>
		    			<td className="border-1">0</td>
		    		</tr>
		    		<tr>
		    			<td className="border-1"> </td>
		    			<td className="border-1"> </td>
		    			<td className="border-1">0</td>
		    		</tr>
		    	</tbody>
		    </table>
		</div>
	)
}*/