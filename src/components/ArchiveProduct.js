import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function ArchiveProduct({ product, isActive, fetchData }) {
    
    const archiveToggle = (productId) => {
        console.log(productId)
        fetch(`${process.env.REACT_APP_API_URL}/products/${productId}/archive`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            
            if(data.message === 'Archive successful'){
                Swal.fire({
                    title: "Success",
                    icon: 'success',
                    text: 'Product deactivated successfully'
                })
                fetchData();
            } else {
                Swal.fire({
                    title: "Error",
                    icon: 'error',
                    text: 'Failed to deactivate product'
                })
                fetchData();
            }
        })
    }

    const activateToggle = (productId) => {
        console.log(productId)
        fetch(`${process.env.REACT_APP_API_URL}/products/${productId}/activate`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)

            if(data.message === 'Activate successful'){
                Swal.fire({
                    title: "Success",
                    icon: 'success',
                    text: 'Product activated successfully'
                })
                fetchData();
            } else {
                Swal.fire({
                    title: "Error",
                    icon: 'error',
                    text: 'Failed to activate product'
                })
                fetchData();
            }
            
        })
    }

    return (
        <>
            {
                isActive ?

                    <Button className='btn btn-danger' size='sm' onClick={() => archiveToggle(product)}>Deactivate</Button>
                :
                    <Button className='btn btn-success' size='sm' onClick={() => activateToggle(product)}>Activate</Button>
            }
        </>
    )
}