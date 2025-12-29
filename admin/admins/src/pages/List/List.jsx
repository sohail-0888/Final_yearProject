import React, { useEffect, useState } from 'react';
import './List.css';
import { data } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function List() {
     const [products, setproduct] = useState([])

           //fetching product from the backend

           const fetchProduct = async (req,res) =>{
                  try {
                     const response = await fetch("http://localhost:3000/allProd");
                     const result =  await response.json();
                     console.log(result);
                     setproduct(result);
                     
                  } catch (error) {
                    console.log(error);
                    
                  }

           }
    //create the function here for removing item from the  database
      const removeItem =  async(id) =>{
          try {
              const response = await fetch(`http://localhost:3000/delprod/${id}`,{
                method:"DELETE",
                 headers:{
                    "Content-Type":"application/json"
                 }
              })
              
               console.log(response);
               

              if(response.ok)
              {
                const updateproduct = products.filter((product)=>  product._id !== id);
                  setproduct(updateproduct);
                  toast.success ("Product deleted successfully");   
              }
              else{
                toast.error("Product not deleted")
              }

          
             
          } catch (error) {
              console.log(error);
              
          }
        
             
      }

      useEffect(() => {
        fetchProduct();
      
      }, [])
      

    return (
        <div className="list add flex-col">
           
            <div className="list-table">
           
                <div className="list-table-format title">
                    <b>Image</b>
                    <b>Description</b>
                    <b>Name</b>
                    <b>Price</b>
                    <b>Category</b>
                    <b>Action </b>
                </div>
                {products.map((product) => (
                    <div key={product._id} className="list-table-format">
                        <img src={`http://localhost:3000/${product.image}`} alt={product.Name} />
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
