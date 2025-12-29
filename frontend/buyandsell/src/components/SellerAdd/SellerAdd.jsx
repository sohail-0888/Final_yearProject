import React, { useEffect, useState } from 'react';
import './SellerAdd.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Add() {
          const [title, settitle] = useState("");
          const [description,setdecription] = useState("");
          const [price , setprice] = useState("");
          const [category, setcategory] = useState("");
          const [image, setimage] = useState(null);
          const [location, setlocation] = useState("");
          const [condition, setcondition] = useState("");

          const onSubmitHandler = async (event) =>{
            event.preventDefault();
           
            const formdata = new FormData();
            formdata.append("title", title);
            formdata.append("description", description);
            formdata.append("price", price);
            formdata.append("category", category);
            formdata.append("image",image);
            formdata.append("location", location);
            formdata.append("condition",condition)
            const token = localStorage.getItem('token');

            const response = await fetch("http://localhost:3000/addProd",{
                method:"POST",
                headers: {
                  'Authorization': `Bearer ${token}`,
              },
               body:formdata,
            })
             console.log(response);
             
             
              
             if(response.ok)
             {
              settitle("");
              setdecription("")
              setprice("");
              setcategory("");
              setimage(null);
              setlocation("");
              setcondition("");
             toast.success ("Product added successfully");
             }
           
          }
  return (
    
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
            <p>Upload Image</p>
            <label htmlFor="image">
                <img src='/upload1.png' alt="upload-area" />
            </label>
            <input  type="file"  id='image' onChange={(e)=>setimage(e.target.files[0])} hidden required/>
        </div>
        <div className="add-product-name flex-col">
                <p>Product name</p>
                <input     type="text" name='name' placeholder='Type here' value={title} onChange={(e) =>settitle(e.target.value)} />
        </div>
        <div className="add-product-description flex-col">
               <p>Product Description</p>
               <textarea    name="description" rows="6" placeholder='write content here' value={description} onChange={(e) =>setdecription(e.target.value)} required></textarea>
        </div>
        <div className="add-category-price">
            <div className="add-category flex-col">
                <p>Choose Category</p>
                <select  className='sub-category' name="category" value={category} onChange={(e) =>setcategory(e.target.value) }>
                  <option value="">Choose Category</option>
                   <option value="cars">Cars</option>
                   <option value="bikes">bikes</option>
                   <option value="mobiles">mobiles</option>
                   <option value="Electronics">Electronics</option>
                   <option value="Furniture">Furniture</option>
                   <option value="Property">Property</option>
                   <option value="Fashion">Fashion</option>
                   <option value="Beauty">Beauty</option>
                </select>
            </div>
            <div className="add-price flex-col">
                  <p>Product Price</p>
                  <input type="Number" name='price' placeholder='Rs20' value={price} onChange={(e)=>setprice(e.target.value)} />
            </div>
        </div>
       

        <div className="add-category-price">
            <div className="add-category flex-col">
                <p>Choose Condition</p>

                <select  className='sub-category' name="condition" value={condition} onChange={(e) =>setcondition(e.target.value) }>
                  <option value="" disabled> Choose the Condition</option>
                   <option value="old">Old</option>
                   <option value="new">New</option>
                  
                </select>
            </div>
            <div className="add-price flex-col">
                  <p>Location</p>
                  <input type="text" name='location' placeholder='location' value={location} onChange={(e)=>setlocation(e.target.value)} />
            </div>
        </div>
        <button className='add-btn'>Add</button>
         <ToastContainer position="top-right" autoClose={2000} />
      </form>
    </div>
     
  )
}
