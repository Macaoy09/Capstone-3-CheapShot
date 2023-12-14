import { useState, useContext, useEffect } from "react";
import { Form, Button } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

export default function AddProduct() {
    const { user } = useContext(UserContext);

    const [ isActive, setIsActive ] = useState(false);

    const [ name, setName ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ imgUrl, setImgUrl ] = useState('');
    const [ price, setPrice ] = useState('');


    function createProduct(e) {
        e.preventDefault();

        fetch(`${process.env.REACT_APP_API_URL}/products/createProduct`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                name: name,
                description: description,
                imgUrl: imgUrl,
                price: price
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)

            if(data.message === "Product created successfully!"){
                Swal.fire({
                    title: 'Success!',
                    icon: 'success',
                    text: 'Product created!'
                })
            } else {
                Swal.fire({
                    title: 'Error',
                    icon: 'error',
                    text: 'Failed creating a product!'
                })
            }
        })

        setName('');
        setDescription('');
        setImgUrl('');
        setPrice('');
    }

    useEffect(() => {
        if(name !== '' && description !== '' && price !== ''){
            setIsActive(true)
        }else {
            setIsActive(false)
        }
    })

    return(
        (user.isAdmin === true)
        ?
        <>
            
                <h1 className="my-5 text-center">Create Product</h1>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Form onSubmit={e => createProduct(e)}>
                        <Form.Group className="mt-3">
                            <Form.Label><h5>Name:</h5></Form.Label>
                            <Form.Control type="text" style={{width: '450px'}} placeholder="Enter Product Name" required value={name} onChange={e => {setName(e.target.value)}}/>
                        </Form.Group>
                        <Form.Group className="mt-3">
                            <Form.Label><h5>Description:</h5></Form.Label>
                            <Form.Control type="text" style={{width: '450px'}} placeholder="Enter Product Description" required value={description} onChange={e => {setDescription(e.target.value)}}/>
                        </Form.Group>
                        <Form.Group className="mt-3">
                            <Form.Label><h5>Image URL:</h5></Form.Label>
                            <Form.Control type="text" style={{width: '450px'}} placeholder="Enter Product Image URL (optional)"  value={imgUrl} onChange={e => {setImgUrl(e.target.value)}}/>
                        </Form.Group>
                        <Form.Group className="mt-3">
                            <Form.Label><h5>Price:</h5></Form.Label>
                            <Form.Control type="number" style={{width: '450px'}} placeholder="Enter Product Price" required value={price} onChange={e => {setPrice(e.target.value)}}/>
                        </Form.Group>
                        {
                            isActive

                            ? <Button className="mt-3 mb-3" variant="success" type="submit">Add</Button>

                            : <Button  className='mt-3 mb-3' variant="success" disabled>Add</Button>

                        }
                    </Form>
                </div>
        
            
	    </>
        :
        <Navigate to="/products" />
    )
}