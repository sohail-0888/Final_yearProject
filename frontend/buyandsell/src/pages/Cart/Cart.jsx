import React, { useContext } from 'react';
import { useNavigate } from "react-router";
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';
export default function Cart() { 
        const {cartItems,  products,removeFromCart,getTotalCartAmount} = useContext(StoreContext);
        const navigate = useNavigate();
  return (
    <div  className='cart'>
        <div className="cart-items">
           <div className="cart-items-title">
              <p>Items</p>
              <p>Title</p>
              <p>Price</p>
              <p>Quantity</p>
              <p>Total</p>
              <p>Remove</p>
           </div>
           <br />
           <hr />
           {products.map((item,index) =>{
               if(cartItems[item._id]>0)
               {
                return(
                   <div>
                 <div className='cart-items-title cart-items-item'>
                         <img src={`http://localhost:3000/${item.image}`} alt="" />
                         <p>{item.title}</p>
                         <p>RS {item.price}</p>
                         <p>{cartItems[item._id]}</p>
                          <p>RS {item.price*cartItems[item._id]}</p>
                          <p onClick={()=>removeFromCart(item._id)} className='cross'>x</p>
                 </div>
                 <hr />
                 </div>
                ) 
               }
           })}
        </div>
        <div className="cart-bottom">
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
                   <p>RS {getTotalCartAmount()===0?0:2}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                   <h1>Total</h1>
                   <b>RS {getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
                </div>
              </div>
              <button onClick={()=>navigate('/order')}>PROCEED TO CHECKOUT</button>
            </div>
            <div className="cart-promocode">
               <div>
                  <p>If you have a promo code , Enter it here</p>
                  <div className="cart-promocode-input">
                     <input type="text" placeholder='promo code' />
                     <button>Submit</button>
                  </div>
               </div>
            </div>
        </div>
    </div>
  )
}
