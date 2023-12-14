import { Form, Button } from 'react-bootstrap';
import { useState, useEffect, useContext} from 'react';
import { Navigate, useParams } from 'react-router-dom';
import UserContext from '../UserContext';
import Swal from 'sweetalert2';


export default function Login() {
    // Uses a global state to access information from UserContext
    const { user, setUser } = useContext(UserContext);
    const { userId } = useParams();

    // create a useState to store user information
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ isActive, setIsActive ] = useState(false);

    
    function authenticateUser(e) {
        e.preventDefault();

        fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(res => res.json())
        .then(data => {
            if(typeof data.access !== 'undefined'){
                localStorage.setItem('token', data.access)
                userAccess(data.access)

                setUser({
                    access: localStorage.getItem('token')
                })

                Swal.fire({
                    title: 'Success message',
                    icon: 'success',
                    text: 'Login Successfully!'
                });
            } else {
                Swal.fire({
                    title: 'Error message',
                    icon: 'error',
                    text: 'User does not exist!'
                })
            }
        })

        setEmail('');
        setPassword('');
    }

    const userAccess = (token) => {
        fetch(`${process.env.REACT_APP_API_URL}/users/${userId}/details`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);

            setUser({
                id: data.details._id,
                isAdmin: data.details.isAdmin
            })
        })
    }

    useEffect(() => {
        if( email !== '' && password !== ''){
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [email,password]);

   return(
    <>
        {(user.id !== null) ?
            <Navigate to='/products' />
        :
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Form  className='mt-5 p-2' style={{backgroundColor: '#E4E4E4', borderRadius: '10px'}} onSubmit={(e) => authenticateUser(e)}>
                <h1 className='text-center my-5'>Login</h1>
                <Form.Group controlId="userEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                    type="email"
                    style={{width: '350px'}}
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required/>
                </Form.Group>
                <Form.Group controlId="userPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                    type="password"
                    style={{width: '350px'}}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required/>
                </Form.Group>
                {
                    isActive ?
                        <Button  className='mt-2' variant="primary" type="submit" id="submitBtn" >Login</Button>
                    :
                        <Button className='ms-auto mt-2' variant="primary" type="submit" id="submitBtn" disabled>Login</Button>
                }
            </Form>
        </div>
        }
    </>
     
    )
}