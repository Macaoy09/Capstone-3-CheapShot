import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import SearchProduct from '../components/SearchProduct';
import Footer from '../components/Footer';

export default function UserDashboard({ productsData }) {

    const [ products, setProducts ] = useState([]);

    useEffect(() => {
        const productArr = productsData.map(product => {
            if(product.isActive === true){
                return (
    
                    <ProductCard productProps={product} key={product._id}/>
                )
            } else {
                return null
            }
        })

        setProducts(productArr);
    }, [productsData])

    return (
        <>

            <SearchProduct/>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '25px'}}>
                {products}
            </div>
            <Footer/>
        </>
    )
}