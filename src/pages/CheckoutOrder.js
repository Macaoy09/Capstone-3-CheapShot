import { useState, useEffect, useContext } from 'react';
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';
import { useParams, useNavigate, Link, Navigate } from 'react-router-dom';
import UserContext from '../UserContext';
import Swal from 'sweetalert2';

export default function CheckoutOrder() {
  const { user } = useContext(UserContext);
  const { productId } = useParams();
  const navigate = useNavigate()

  console.log(productId)
  // useState for useEffect hook
  const [ quantity, setQuantity ] = useState('');
  const [ id, setId ] = useState('')
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [ imgUrl, setImgUrl] = useState('');
  const [price, setPrice] = useState('');

  const checkout = (productId) => {
    fetch(`${process.env.REACT_APP_API_URL}/users/checkout`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        productId: id,
        productName: name,
        quantity: quantity
      })
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.message === 'Purchase successfully!') {
          Swal.fire({
            title: 'Success',
            icon: 'success',
            text: 'Purchased Successfully!',
          });
          navigate('/products')
        } else {
          Swal.fire({
            title: 'Error',
            icon: 'error',
            text: 'Purchase Failed',
          });
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/products/${productId}/viewProduct`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setId(data.details._id);
        setName(data.details.name);
        setDescription(data.details.description);
        setImgUrl(data.details.imgUrl)
        setPrice(data.details.price);
      });
  }, [productId]);

  return (
    (!user.isAdmin) ?
        <>
            <Container className="mt-5">
                <Row>
                    <Col sm={{ span: 3, offset: 4 }}>
                    <Card className='mb-5'>
                        <Card.Body>
                            <Card.Img src={imgUrl}></Card.Img>
                            <Card.Title>{name}</Card.Title>
                            <Card.Subtitle>Description:</Card.Subtitle>
                            <Card.Text>{description}</Card.Text>
                            <Card.Subtitle><h5>Price:</h5></Card.Subtitle>
                            <Card.Text><h5>₱{price}</h5></Card.Text>
                            <Form.Group>
                              <Form.Label>Quantity:</Form.Label>
                              <Form.Control type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Enter quantity" required/> 
                            </Form.Group>
                            
                        {user.id !== null ? (
                            <Button className='mt-3' variant="danger" block onClick={checkout}>
                            Order Now
                            </Button>
                        ) : (
                            <Link className="btn mt-3 btn-danger btn-block" to="/login">
                            Log in to Buy our products
                            </Link>
                        )}
                        </Card.Body>
                    </Card>
                    </Col>
                </Row>
            </Container>
        </>
        :
        <Navigate to='/products'/>
  );
}
