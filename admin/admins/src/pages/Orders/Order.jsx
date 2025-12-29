import React from 'react';
import  './Order.css';
import { useState } from 'react';
import { useEffect } from 'react';
export default function Order() {
       const [orders, setOrders]    =  useState([]);
        const fetchAllOrders = async () =>{
           try {
               const response = await fetch("http://localhost:3000/listOrders",{
                    method:"GET",
                   headers:{
                    'content-Type': `application/json`
                   }
               })

               const result = await response.json();
                console.log(result);
                setOrders(result.data);
                
           } catch (error) {
               console.log("Error in fetching the data:",error);       
           }
        }


        const statusHandler = async(event,orderId) =>{
          try {
            const response  = await fetch('http://localhost:3000/status',{
              method:"POST",
              headers:{
                'content-Type': `application/json`
               },
              body: JSON.stringify({
                orderId: orderId,
                status:event.target.value
              })
             
           })
             const result = await response.json();
           if(result.success)
           {
            await fetchAllOrders();
           }
           else{
            console.log("Updated failed", result.message);
            
           }
            
          } catch (error) {
            console.log(error);
            
          }
          
             
        }

        useEffect(()=>{
               fetchAllOrders();
        },[])
  return (
    <div className='order add'>
      
      <div className="order-list">
        {orders.map((order,index)=>(
           <div key={index} className="order-item">
              <img src="parcel.png" alt="parcel img" />
              <div>
               <p className="order-item-product">
                {order.items.map((item,index)=>{
                     if(index ===order.items.length -1){
                      return item.product.title + " x "+ item.quantity
                     }
                     else{
                      return item.product.title + " x "+ item.quantity+ ","
                     }
                })}
               </p>
               <p className='order-item-name'>{order.userDetail.name}</p>
                <div className="order-item-address">
                  <p>{order.userDetail.street+ ","}</p>
                   <p>{order.userDetail.city+","+order.userDetail.country+ ","+order.userDetail.zipCode}</p>
                </div>

                <p  className='order-item-phone'>PhoneNO</p>
              </div>
              <p>Items :{order.items.length}</p>
              <p>RS {order.amount}</p>
              <select onChange={(event)=> statusHandler(event,order._id)} value={order.status}>
                <option id='pending' value="Order Processing">Pending</option>
                <option id='OFD' value="Out for delivery">Out for delivery</option>
                <option id="Delv" value="Delivered">Delivered</option>
              </select>
           </div>

        ))}
      </div>
    </div>
  )
}
