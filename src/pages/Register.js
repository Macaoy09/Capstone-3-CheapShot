import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import Footer from '../components/Footer';
import Swal from 'sweetalert2';


export default function Register() {

    const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("")
	const [email, setEmail] = useState("")
	const [mobileNumber, setMobileNumber] = useState("")
	const [password, setPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")

    const [isActive, setIsActive] = useState(false);

    function registerUser(e) {

        // Prevents page redirection via form submission
        e.preventDefault();

        fetch(`${process.env.REACT_APP_API_URL}/users/register`,{
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({

            firstName: firstName,
            lastName: lastName,
            email: email,
            mobileNumber: mobileNumber,
            password: password

        })
        })
        .then(res => res.json())
        .then(data => {

        console.log(data);
		
		if(data.message === 'User successfully created!'){
			Swal.fire({
				title: 'Successful',
				icon: 'success',
				text: 'Account creation successful!'

			})
	
			setFirstName('');
			setLastName('');
			setEmail('');
			setMobileNumber('');
			setPassword('');
			setConfirmPassword('');

			
		} else if (data.message === 'User already exists') {
			Swal.fire({
				title: 'User already exist',
				icon: 'error',
				text: 'Account with this email already exists!'
			})
		} else {
			Swal.fire({
				title: 'Error',
				icon: 'error',
				text: 'Failed account creation!'
			})
		}

        })
    }

    useEffect(() => {
        if((firstName !== "" && lastName !== "" && email !== "" && mobileNumber !== "" && password !== "" && confirmPassword !== "") && (password === confirmPassword) && (mobileNumber.length === 11)){

            setIsActive(true)

        } else {

            setIsActive(false)
        }
    },[firstName,lastName,email,mobileNumber,password,confirmPassword])

    return (
		<>
			<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px'}}>
				<Form style={{borderRadius: '10px', backgroundColor : '#E4E4E4', padding : '10px', margin : '30px'}} onSubmit= {(e) => registerUser(e)}>
				<h1 className="my-5 text-center">Register</h1>
					<Form.Group>
						<Form.Label>First Name:</Form.Label>
						<Form.Control 
						type="text" 
						placeholder="Enter First Name" 
						style={{ width: '350px'}}
						required
						value={firstName}
						onChange={e => {setFirstName(e.target.value)}}
						/>
					</Form.Group>
					<Form.Group className='mt-3'>
						<Form.Label>Last Name:</Form.Label>
						<Form.Control 
						type="text" 
						placeholder="Enter Last Name" 
						style={{ width: '350px'}}
						required
						value={lastName}
						onChange={e => {setLastName(e.target.value)}}
						/>
					</Form.Group>
					<Form.Group className='mt-3'>
						<Form.Label>Email:</Form.Label>
						<Form.Control 
						type="email" 
						placeholder="Enter Email" 
						style={{ width: '350px'}}
						required
						value={email}
						onChange={e => {setEmail(e.target.value)}}
						/>
					</Form.Group>
					<Form.Group className='mt-3'>
						<Form.Label>Mobile No:</Form.Label>
						<Form.Control 
						type="number" 
						placeholder="Enter 11 Digit No."
						style={{ width: '350px'}} 
						required
						value={mobileNumber}
						onChange={e => {setMobileNumber(e.target.value)}}
						/>
					</Form.Group>
					<Form.Group className='mt-3'>
						<Form.Label>Password:</Form.Label>
						<Form.Control 
						type="password" 
						placeholder="Enter Password"
						style={{ width: '350px'}} 
						required
						value={password}
						onChange={e => {setPassword(e.target.value)}}
						/>
					</Form.Group>
					<Form.Group className='mt-3'>
						<Form.Label>Confirm Password:</Form.Label>
						<Form.Control 
						type="password" 
						placeholder="Confirm Password"
						style={{ width: '350px'}} 
						required
						value={confirmPassword}
						onChange={e => {setConfirmPassword(e.target.value)}}
						/>
					</Form.Group>
					{
						isActive

						? <Button className='mt-2 mb-5' variant="primary" type="submit">Register</Button>

						: <Button className='mt-2 mb-5' variant="primary" disabled>Register</Button>

					}
				</Form>
			</div>
			<Footer/>
		</>	
	)

}