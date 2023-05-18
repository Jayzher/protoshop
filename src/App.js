import './App.css';
import { Container } from 'react-bootstrap';
import {Navigate, BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {useState, useEffect} from 'react';
import AppNavBar from './components/AppNavBar';
import { UserProvider } from './userContext';
import { ProdProvider } from './prodContext';
import { OrderProvider } from './orderContext';
import Home from './page/Home';
import Login from './page/Login';
import Register from './page/Register';
import Dashboard from './page/Dashboard';
import Products from './page/Products';
import Logout from './page/Logout';
import UserDashboard from './page/UserDashboard';
import Contact from './page/Contact';
import Orders from './page/Orders';

function App() {
  const [user, setUser] = useState({
    id: null,
    isAdmin: null,
    name: null,
  });

  const [myProducts, setMyProducts] = useState([]);

  const [orders, setOrders] = useState([]);

  const unsetUser = () => {
    localStorage.clear();
  }

  useEffect(() => {
    if (user.id !== null && user.id !== undefined) {
        document.getElementById("sideNav").style.display = "none";
        <Navigate to="/Logout" />
      }
  })

  return (
    <UserProvider value={{user, setUser, unsetUser}}>
      <ProdProvider value={{myProducts, setMyProducts}}>
      <OrderProvider value={{orders, setOrders}}>
      <Router>
        <AppNavBar />
        <Container style={{height: "100%"}}>
          <Routes>
             <Route path="/Login" element={<Login />} />
             <Route path="/Signup" element={<Register />} />
             <Route path="/Dashboard/admin" element={<Dashboard />} />
             <Route path="/Contact" element={<Contact />} />
             <Route path="/Orders" element={<Orders />} />
             <Route path="/Dashboard" element={<UserDashboard />} />
             <Route path="/Logout" element={<Logout />} />
             <Route path="*" element={<Register />}/>
          </Routes>
        </Container>
      </Router>
      </OrderProvider>
      </ProdProvider>
    </UserProvider>
  );
}

export default App;
