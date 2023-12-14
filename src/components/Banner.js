import  Carousel  from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';


export default function Banner() {
    return (
        <Carousel className='mb-5'>
                <Carousel.Item as={Link} to='/products'>
                    <img src='https://boozeshop.ph/pub/media/images/banners/2023-1011_singleton.jpeg'></img>
                </Carousel.Item>
                <Carousel.Item as={Link} to='/products'>
                    <img src='https://boozeshop.ph/pub/media/images/banners/2022-0307_threehens.jpeg'></img>
                </Carousel.Item>
                <Carousel.Item as={Link} to='/products'>
                    <img src="https://boozeshop.ph/pub/media/images/banners/2023-1109_giftingstudio.jpg"></img>
                </Carousel.Item>
                <Carousel.Item as={Link} to='/products'>
                    <img src="https://boozeshop.ph/pub/media/images/banners/2021-1008_dewars.jpeg"></img>
                </Carousel.Item>
                <Carousel.Item as={Link} to='/products'>
                    <img src="https://boozeshop.ph/pub/media/images/banners/2023-1011_tanqueray.jpeg"></img>
                </Carousel.Item>
                <Carousel.Item as={Link} to='/products'>
                    <img src="https://boozeshop.ph/pub/media/images/banners/2023-1109_bluelabel.jpg"></img>
                </Carousel.Item>
        </Carousel>
    )
}