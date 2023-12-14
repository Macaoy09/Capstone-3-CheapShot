import { useState, useEffect, useContext } from 'react';
import UserContext from '../UserContext';
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';



export default function Products() {

    const { user } = useContext(UserContext);

    const [ products, setProducts ] = useState([]);


    const fetchData = () => {
        fetch(`${process.env.REACT_APP_API_URL}/products/viewAllProducts`)
        .then(res => res.json())
        .then(data => {
            console.log(data);

            setProducts(data.productList);
        })
    }
 
    console.log(products)
    useEffect(() => {
        fetchData()
    }, [])


    return (
        <>
        {
            (user.isAdmin === true) ?
                <AdminDashboard productsData={products} fetchData={fetchData} />

                :

                <UserDashboard productsData={products} />
            
        }
    </>
      
    )
}