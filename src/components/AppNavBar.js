import './comp.css';
import {Container, Nav, Navbar} from 'react-bootstrap';
import {Link, NavLink, Navigate} from 'react-router-dom'; 
import { useContext, useEffect, useState } from 'react';
import UserContext from '../userContext';
import SideNavBar from './SideNavBar';
import React from 'react';
import {  CDBSidebar,  CDBSidebarContent,  CDBSidebarFooter,  CDBSidebarHeader,  CDBSidebarMenu, CDBSidebarMenuItem,} from 'cdbreact';
import { Power, EnvelopeAt, CartCheck, Grid, PersonCircle } from 'react-bootstrap-icons';


export default function AppNavBar() {
		const { user } = useContext(UserContext);
		const [admin, setAdmin] = useState("/Dashboard");

	return (
		<>
	    <Navbar style={{padding: "0", top: "0", width: "100%", height: "8vh"}} className="fw-bold fs-5 opacity" expand="lg">
	      <Container>
	        <Navbar.Brand className="fs-3 ms-5">ProtoShop</Navbar.Brand>
	        <Navbar.Toggle aria-controls="basic-navbar-nav" />
	        <Navbar.Collapse id="basic-navbar-nav">
	        <Nav justify variant="tabs" className="ms-auto mb-2">
		        {
		        		(user.id !== null && user.id !== undefined ) ?
		        <>
		          		<div id="sideNav" style={{position: "fixed", zIndex: "1", height: '100vh', overflow: 'scroll initial',  left: "0", top: "0"}}>
					      <CDBSidebar textColor="#fff" backgroundColor="rgba(0,0,0,0.8)">
					        <CDBSidebarHeader prefix={<i id="menu" className="fa fa-bars fa-large"></i>}>
					          <a href="/" className="text-decoration-none" style={{ color: 'inherit', fontSize: "1.2rem" }}>
					            {user.name}
					          </a>
					        </CDBSidebarHeader>

					        <CDBSidebarContent className="sidebar-content" style={{padding: "0"}}>
					          <CDBSidebarMenu>
					            <NavLink exact to="/Profile" activeClassName="activeClicked">
					              <CDBSidebarMenuItem id="item"> <PersonCircle style={{fontSize: "2rem", fontWeight: "bold", marginRight: "1rem"}} />Profile</CDBSidebarMenuItem>
					            </NavLink>
					            <NavLink exact to={admin} activeClassName="activeClicked">
					              <CDBSidebarMenuItem id="item"> <Grid style={{fontSize: "2rem", fontWeight: "bold", marginRight: "1rem"}} />Dashboard</CDBSidebarMenuItem>
					            </NavLink>
					            {
					            	 (user.isAdmin === true) ?
					            	 <>
							            <NavLink exact to="/Contact" activeClassName="activeClicked">
							              <CDBSidebarMenuItem id="item"> <EnvelopeAt style={{fontSize: "2rem", fontWeight: "bold", marginRight: "1rem"}} />Contact</CDBSidebarMenuItem>
							            </NavLink>
							            <NavLink exact to="/Logout" activeClassName="activeClicked">
							              <CDBSidebarMenuItem id="item"> <Power style={{fontSize: "2rem", fontWeight: "bold", marginRight: "1rem"}} />Logout</CDBSidebarMenuItem>
							            </NavLink>
							          </>
									: 	
									<>
						            	<NavLink exact to="/Orders" activeClassName="activeClicked">
							              <CDBSidebarMenuItem id="item"> <CartCheck style={{fontSize: "2rem", fontWeight: "bold", marginRight: "1rem"}} />Orders</CDBSidebarMenuItem>
							            </NavLink>
							            <NavLink exact to="/Contact" activeClassName="activeClicked">
							              <CDBSidebarMenuItem id="item"> <EnvelopeAt style={{fontSize: "2rem", fontWeight: "bold", marginRight: "1rem"}} />Contact</CDBSidebarMenuItem>
							            </NavLink>
							            <NavLink exact to="/Logout" activeClassName="activeClicked">
							              <CDBSidebarMenuItem id="item"> <Power style={{fontSize: "2rem", fontWeight: "bold", marginRight: "1rem"}} />Logout</CDBSidebarMenuItem>
							            </NavLink>
							        </>
					            }
					          </CDBSidebarMenu>
					        </CDBSidebarContent>
					      </CDBSidebar>
					    </div>
		         </>
		         :
		         <>
		        		<Nav.Link style={{paddingBottom: "2vh", marginTop: "20px", width: "15vh"}} className="link trans" as={NavLink} to="/Signup">Sign-up</Nav.Link>
						<Nav.Link style={{paddingBottom: "2vh", marginTop: "20px", width: "15vh"}} className="link trans" as={NavLink} to="/Login">Log-in</Nav.Link>
				 </>
				}  
			</Nav>        	                  			
	        </Navbar.Collapse>
	      </Container>
	    </Navbar>
		</>
	)
}