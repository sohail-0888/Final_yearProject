import React, { useContext, useEffect, useState } from 'react'
import './MyOrder.css'
import { StoreContext } from '../../context/StoreContext'
export default function MyOrder() {
    const {authToken} = useContext(StoreContext);
       const [data, setdata] = useState([]);


       const fetchOrders = async  () =>{
           try {
              const response = await fetch("http://localhost:3000/userOrders",{
                method:"GET",
                headers:{
                  'Authorization':` ${authToken}`,
                  'content-Type': `application/json`
                }
              })
            
              const result = await  response.json();
              console.log( "order result:",result);
               setdata(result.data);
              
           } catch (error) {
                console.log("fetch error:",error);  
           }
       }

       useEffect(()=>{
          fetchOrders();
       },[])
  return (
    <div className='my-order'>
         <h2>My Orders</h2>
        
          <div className="order-container">
         {data.map((order,index)=>{
            return (
                
                <div  key={index} className="my-orders-order">
                        <img src="parcel.png" alt="" />
                        <p>{order.items.map((item,index)=>{
                              if(index === order.items.length-1)
                              {
                                return item.product.title+ "x"+item.quantity;
                              }
                              else{
                                return item.product.title + "x" + item.quantity+","
                              }
                        })}</p>
                        <p>RS {order.amount}.00</p>
                        <p>Items: {order.items.length}</p>
                        <p><span>&#x25cf;</span><b> {order.status}</b></p>
                        <button onClick={fetchOrders}>Track Order</button>
                </div>

            )
         })}
      
      </div>
    </div>
  )
}
