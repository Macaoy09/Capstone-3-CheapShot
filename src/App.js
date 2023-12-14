import './App.css';

import AppNavbar from './components/AppNavbar';

import AddProduct from './pages/AddProduct';
import CheckoutOrder from './pages/CheckoutOrder';
import Home from  './pages/Home';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Products from './pages/Products';
import Register from './pages/Register';

import { Container } from 'react-bootstrap';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { UserProvider } from './UserContext';

function App() {

  const [user, setUser] = useState({
    id: null,
    isAdmin: null
  })

  const unsetUser = () => {
    localStorage.clear();
  }

  const { userId } = useParams();

  useEffect(() => {
      fetch(`${process.env.REACT_APP_API_URL}/users/${userId}/details`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data)
          if (typeof data.details._id !== 'undefined') {
            setUser({
              id: data.details._id,
              isAdmin: data.details.isAdmin
            });

          } else {
            setUser({
              id: null,
              isAdmin: null
            });
          }
        })
        .catch(error => {
          console.error('Error fetching user details:', error);
        });
  }, []);

  console.log(user)

  return (
    <UserProvider value={{ user, setUser, unsetUser }}>
      <Router>
        <Container fluid>
          <AppNavbar/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/products' element={<Products />}/>
            <Route path='/products/:productId' element={<CheckoutOrder/>}/>
            <Route path='/addProduct' element={<AddProduct />}/>
            <Route path='/logout' element={<Logout />}/>
            <Route path='/register' element={<Register />}/>
          </Routes>
        </Container>
      </Router>
    </UserProvider>
  );
}

export default App;
