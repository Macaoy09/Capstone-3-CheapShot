import { useState } from 'react';
import { Card, CardFooter, Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function ProductCard({productProps}) {

    const { _id, name, description, imgUrl, price } = productProps;
    console.log(useState(0))

    
    return (
		<div className='mb-3'>
			<Row>
				<Col sm={1}>
					<Card style={{ width: '15rem'}}>
						<Card.Img variant="top" src={imgUrl} style={{height: '200px'}}/>
						<Card.Body style={{ height: '205px', overflow: 'hidden', fontSize: '15px'}}>
							<Card.Title>{name}</Card.Title>
							<Card.Text>
							{description}
							</Card.Text>
						</Card.Body>
						<CardFooter>
							<Card.Text>
								<h5>₱{price}</h5>
							</Card.Text>
							<Link className="btn btn-danger d-block" to={`/products/${_id}`}>Order Now</Link>
						</CardFooter>
					</Card>
				</Col>
			</Row>
		</div>
		
			
    )
    
}

ProductCard.propTypes = {
	// The "shape" method is used to check if a prop object conforms to a specific "shape:
	product: PropTypes.shape({
		// Define the properties and their expected types
		name: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		price: PropTypes.number.isRequired
	})
}