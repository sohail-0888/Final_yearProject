import React, { useEffect, useState } from 'react';
import './SellerList.css';
import { toast, ToastContainer } from 'react-toastify';


export default function List() {
     const [products, setproduct] = useState([])
  
     const fetchProducts = async () =>{
        try {
            const response = await fetch("http://localhost:3000/allProd");
           
            const data = await response.json();
              console.log("Fetched data:", data);
            setproduct(data);
            
        } catch (error) {
            console.log(error);
            
        }
     }

     const removeItem = async (id) =>{
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`http://localhost:3000/deleteProd/${id}`,{
                method: "DELETE",
                headers:{
                    'Authorization': `Bearer ${token}`,
                }
            })

            if(response.ok){
                const updatedProducts = products.filter((product) => product._id !== id);
                setproduct(updatedProducts);
                 toast.success ("Product deleted successfully");
            }
            else{
                console.log("product not deleted");;
                
            }
        } catch (error) {
            console.log(error);
            
        }
     }
     



      useEffect(() => {
    
        fetchProducts();
      }, [])
      

    return (
        <div className="list add flex-col">
            <p>All Product List </p>
            <div className="list-table">
                <div className="list-table-format title">
                    <b>Image</b>
                    <b>Description</b>
                    <b>Name</b>
                    <b>Price</b>
                    <b>Category</b>
                    <b>Action </b>
                </div>
                {products.map((product, index) => (
                    <div key={index} className="list-table-format">
                        <img  src={`http://localhost:3000/${product.image}`}   alt={product.title} />

                        <p>{product.description}</p>
                        <p>{product.title}</p>
                        <p>{product.price}</p>
                        <p>{product.category}</p>
                        <p onClick={()=>removeItem(product._id)} className='cursor'>x</p>
                    </div>
                ))}
            </div>
             <ToastContainer position="top-right" autoClose={2000} />
        </div>
    )
}
