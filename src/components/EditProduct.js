import { Button, Modal, Form } from 'react-bootstrap';
import { useState } from 'react';
import Swal from 'sweetalert2';

export default function EditProduct({ product, fetchData }){
    const [ productId, setProductId ] = useState('');

    const [ name, setName ] = useState('');
    const [ description, setDescription ] = useState('');
	const [ imgUrl, setImgUrl ] = useState('');
    const [ price, setPrice ] = useState('');

    const [ show, setShow ] = useState(false);

    const editProduct = (e, productId) => {
		e.preventDefault();
		fetch(`${process.env.REACT_APP_API_URL}/products/${productId}/update`, {
			method: 'PUT',
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
		.then (res => res.json())
		.then (data => {
			console.log(data)

			if(data.message === 'Update successful'){
				Swal.fire({
					title: 'Success!',
					icon: 'success',
					text: 'Product Successfully Updated'
				})
				closeEdit();
				fetchData();
			} else {
				Swal.fire({
					title: 'Error!',
					icon: 'error',
					text: 'Please try again'
				})
				closeEdit();
				fetchData();
			}
		})
		}

	// function for opening the modal
	const openEdit = (productId) => {
		fetch(`${process.env.REACT_APP_API_URL}/products/${productId}/viewProduct`)
		.then(res => res.json())
		.then(data => {
			console.log(data)
			setProductId(data.details._id);
			setName(data.details.name);
			setDescription(data.details.description);
			setImgUrl(data.details.imgUrl);
			setPrice(data.details.price);
		})

		setShow(true);
	}

	const closeEdit = () => {
		setShow(false);
		setName('')
		setDescription('')
		setPrice(0)
	}





	return(
	<>
		<Button variant="primary" size="sm" onClick={() => openEdit(product)}> Edit</Button>
		{/*EDIT MODAL*/}
		<Modal show={show} onHide={closeEdit}>
            <Form onSubmit={e => editProduct(e, productId)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit product</Modal.Title>
                </Modal.Header>

                <Modal.Body>    
                    <Form.Group controlId="productName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control 
                        type="text" 
                        value={name}
                        onChange={e=> setName(e.target.value)}
                        required
                        />
                    </Form.Group>
                    <Form.Group controlId="productDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control 
                        type="text"
                        value={description}
                        onChange={e=> setDescription(e.target.value)}
                         required/>
                    </Form.Group>
					<Form.Group controlId="productImgUrl">
                        <Form.Label>Image URL</Form.Label>
                        <Form.Control 
                        type="text"
                        value={imgUrl}
                        onChange={e=> setImgUrl(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="productPrice">
                        <Form.Label>Price</Form.Label>
                        <Form.Control 
                        type="number"
                        value={price}
                        onChange={e=> setPrice(e.target.value)}
                        required/>
                    </Form.Group>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" size="sm" onClick={closeEdit}>Close</Button>
                    <Button size='sm' variant="success" type="submit">Edit</Button>
                </Modal.Footer>
            </Form>
        </Modal>
	</>
	)
}