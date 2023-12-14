import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Logo from '../images/logo.png';
import { Link, NavLink } from 'react-router-dom';
import React,{ useContext } from 'react';
import UserContext from '../UserContext';


export default function AppNavbar() {

	const { user } = useContext(UserContext);
    return (
        <Navbar bg='light' expand="lg">
		  <Container fluid>
				<Navbar.Brand as={Link} to="/"><img src={Logo} className='logo'/></Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto">
						<Nav.Link as={NavLink} to='/' exact>Home</Nav.Link>
						<Nav.Link as={NavLink} to='/products' exact>Products</Nav.Link>
						{(user.id !== null) ?
							!user.isAdmin ?
							<>
								<Nav.Link as={NavLink} to="/profile" exact>Profile</Nav.Link>
								<Nav.Link as={NavLink} to="/logout" exact>Logout</Nav.Link>
							</>
							:
							<>
								<Nav.Link as={Link} to="/addProduct" exact>Add Product</Nav.Link>
			      	   			<Nav.Link as={Link} to="/logout" exact>Logout</Nav.Link>	
							</>
							:
							<>
								
								<Nav.Link as={NavLink} to="/login" exact>Login</Nav.Link>
				      			<Nav.Link as={NavLink} to="/register" exact>Register</Nav.Link>
							</>
						}
					
						
					</Nav>
		
				</Navbar.Collapse>
		   	</Container>
		</Navbar>
		
    )
}