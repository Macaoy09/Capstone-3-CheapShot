import { Col, Row, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Categories() {

    return (
        <div className='mb-5'>
            <Row>
                <Col xs={10} sm={2}>
                    <Card as={Link} to='/products' style={{textDecoration : 'none', alignItems : 'center'}}>
                        <Card.Img variant="top" src="https://boozeshop.ph/pub/media/images/subbanner-beer2.jpeg" />
                        <Card.Body>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={10} sm={2}>
                    <Card as={Link} to='/products' style={{textDecoration : 'none', alignItems : 'center'}}>
                        <Card.Img  variant="top" src="https://boozeshop.ph/pub/media/images/subbanner-whiskey2.jpeg" />
                        <Card.Body>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={10} sm={2}>
                    <Card as={Link} to='/products' style={{textDecoration : 'none', alignItems : 'center'}}>
                        <Card.Img variant="top" src="https://boozeshop.ph/pub/media/images/subbanner-wine.jpeg" />
                        <Card.Body>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={10} sm={2}>
                    <Card as={Link} to='/products'>
                        <Card.Img variant="top" src="https://boozeshop.ph/pub/media/images/subbanner-rum2.jpeg" />
                        <Card.Body>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={10} sm={2}>
                    <Card as={Link} to='/products'>
                        <Card.Img variant="top" src="https://boozeshop.ph/pub/media/images/subbanner-gin2.jpeg" />
                        <Card.Body>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={10} sm={2}>
                    <Card as={Link} to='/products'>
                        <Card.Img variant="top" src="https://boozeshop.ph/pub/media/images/subbanner-vodka2.jpeg" />
                        <Card.Body>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
        
    )
}