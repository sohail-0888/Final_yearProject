import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../context/StoreContext';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './PlaceOrder.css';

export default function PlaceOrder() {
  const { getTotalCartAmount, authToken, products, cartItems } = useContext(StoreContext);
  const [data, setdata] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phoneNO: "",
  });

  const [paymentMethod, setpaymentMethod] = useState('COD');
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setdata(data => ({ ...data, [name]: value }));
  }



  const placeOrder = async (e) => {
    e.preventDefault();

    const itemsArray = Object.entries(cartItems).map(([productId, quantity]) => {
      const product = products.find(p => p._id === productId);

      
      if (quantity < 1) {
        console.log("Invalid quantity for product", productId);
        return null; 
      }

      return {
        product: {
          title: product?.title,
          price: product?.price,
        },
        quantity: quantity,
      };
    }).filter(item => item !== null); 

  
    if (itemsArray.length === 0) {
      console.log("No valid items to place the order.");
      return;
    }

    const orderDetails = {
      ...data,
      items: itemsArray,
      amount: getTotalCartAmount() + 2, 
      paymentMethod: paymentMethod,

      userDetail:
       {
        name: `${data.firstName} ${data.lastName}`,
        street: data.street,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
        country: data.country,
      },
  
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNo: data.phoneNO,
      email: data.email,
    };

   
    if (orderDetails.amount < 1) {
      console.log("Invalid amount for the order.");
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/placeOrder', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderDetails),
      });

      const result = await response.json();
       console.log(result);
      console.log("Selected Payment Method: ", paymentMethod);
      if (result.success) {

         if(paymentMethod === "COD")
         {
          
        toast.success ("order add successfully");
           
         
         } else if(paymentMethod === "Stripe")
         {
          window.location.href = result.session_url;
         }
        
      } else {
        console.log("Error in placing order", result.error);
      }
    } catch (error) {
      console.error("Error in submitting order", error);
    }
};

 const navigate = useNavigate(

 );

useEffect(()=>{
        if(!authToken)
        {
           navigate('/cart')
        }
        else if(getTotalCartAmount() ===0)
        {
          navigate('/cart')
        }
},[authToken])
 
  

  return (
    <form className='Place-order' onSubmit={placeOrder}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input type="text" placeholder='First Name' name="firstName" onChange={handleChange} value={data.firstName} />
          <input type="text" placeholder='Last name' name="lastName" onChange={handleChange} value={data.lastName} />
        </div>
        <input type="email" placeholder='Email address' name='email' onChange={handleChange} value={data.email} />
        <input type="text" placeholder='Street' name="street" onChange={handleChange} value={data.street} />

        <div className="multi-fields">
          <input type="text" placeholder='City' name="city" onChange={handleChange} value={data.city} />
          <input type="text" placeholder='State' name="state" onChange={handleChange} value={data.state} />
        </div>

        <div className="multi-fields">
          <input type="text" placeholder='Zip code' name="zipCode" onChange={handleChange} value={data.zipCode} />
          <input type="text" placeholder='Country' name="country" onChange={handleChange} value={data.country} />
        </div>

        <input type="text" placeholder='Phone' name="phoneNO" onChange={handleChange} value={data.phoneNO} />
        <h5>Select Payment Method:</h5>
         <div className="payment-method"> 
            <label>
              <input  type='radio' value="COD" checked={paymentMethod === 'COD'}  onChange={(e)=>setpaymentMethod(e.target.value)}/>
              <span> Cash On Delivery</span> 
            </label>
           
            <label>
              <input  type='radio' value="Stripe" checked={paymentMethod === 'Stripe'}  onChange={(e)=>setpaymentMethod(e.target.value)}/>
              <span> Pay with Card (Stripe)</span>
           </label>
            
         </div>
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>RS {getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>RS {getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <h1>Total</h1>
              <b>RS {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>

          <button>PROCEED TO Payment</button>
        </div>
        <ToastContainer position="top-right" autoClose={2000} />
      </div>
    </form>
  )
}
