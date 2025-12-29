import { createContext, useEffect, useState } from "react";
import  Product from "../data/Product.json";

export const StoreContext = createContext(null)
    
const StoreContextProvider = (props) => {
  const [products, setProducts] = useState([])
  const [cartItems, setCartItems] = useState({});
  const [authToken, setAuthToken] = useState(localStorage.getItem('token') || null);

  const [user, setuser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error("Error parsing user from localStorage:", error);
      return null;
    }
  });
  

   //usefetch for fetching data from the 
   useEffect(() => {
    const fetchProducts =  async() =>{
           try {
             const  response =  await fetch("http://localhost:3000/allProd", {
                method:"Get",
                headers:{
                  "Content-Type": "application/json",
                 Authorization: `Bearer ${authToken}`
                }
             });
             const data = await  response.json();
               console.log( "all product:",data);
              
              
                if(data.length>0)
                {
                    setProducts(data);
                } else 
                {
                  setProducts(Product)
                }
               
               
              
           } catch (error) {
               console.log(error);
               setProducts(Product)
               
           }
    }

    fetchProducts();
  
   
  }, [authToken])
  
  //add to  cart functionality;
  const addToCart =   async(itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
    }
    else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
    }
      
    const response = await fetch("http://localhost:3000/addToCart",{
         method: "POST",
         
         headers: {
           "Content-Type": "application/json",
           Authorization: `Bearer ${authToken}`
         },
         body: JSON.stringify({ 
            userId: user._id,
            itemId: itemId
          })
    });
    const data  = await response.json();
    console.log(data);
    
    if(!response.ok){
      console.log(data.error);
      alert(data.error);
      
    }
    if(response.ok)
    {
      console.log("Item add to cart successfully", data);
      alert("Item added to cart successfully")
      
    }
  }

  //remove carts
  const removeFromCart = async(itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))

     const response  = await fetch("http://localhost:3000/removeCart", {
        method: "POST",
        headers:{
          "Content-Type":"application/json",
          Authorization: `Bearer ${authToken}`
        },
        body:JSON.stringify({
          userId: user._id,
          itemId:itemId
        })

     });
     console.log(response);
     
     const result = await response.json();
     console.log(result.message);
     
  }

//for getting cart 
useEffect(() => {
  const fetchProduct = async () => {
    try {
      const response = await fetch("http://localhost:3000/getCart", {
        headers: {
          "Authorization": `Bearer ${authToken}`
        }
        ,
      });
      console.log(response);
      const data = await response.json();
      console.log(data);
      
      if(data.success){
         const items = {};
         data.cart.forEach((cartItem) =>{
           items[cartItem.product] = cartItem.quantity;
         })
         setCartItems(items);
      } else{
         console.log("No cart found");
         setCartItems({});
      }
      
    } catch (error) {
        console.log(error);
        
    }
   
   
  };

  fetchProduct();
}, []);

  


const getTotalCartAmount = () => {
    if(products.length === 0) return 0;
  let totalAmount = 0;
  for (const item in cartItems) {
    if (cartItems[item] > 0) {
      let itemInfo = products.find((product) => product._id === item);
      if(itemInfo){
        totalAmount += itemInfo.price * cartItems[item];
      }
     
    }
  }
  return totalAmount;
}


//for report 
 const addToReport = async(productId,description) =>{
  console.log(`Bearer${authToken}`);
            try {
              const response = await fetch("http://localhost:3000/addReport",{
                method:"POST",
                headers:{
                   "Content-Type" : "application/json",
                   Authorization: `Bearer ${authToken}`,
                },
            
                
                body:JSON.stringify({
                  productId,
                  description
                }),
              })

              const data = await response.json();
              console.log(data);
              

              if(response.ok)
              { 
                alert("Report Submitted Successfully");
                return {success:true , message:"Report submitted succesfully"};
              }
              else{
                return {success:false, messsag:data  || "Failed to submit report."};
              }
            
              
            } catch (error) {
               console.log("report error:", error);
               return{success:false, message: "Error in submitting report"}
               
            }
 }


 
  const contextValue = {
    products,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    authToken,
    setAuthToken,
    user,
    setuser,
    addToReport
  }

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  )
}


export default StoreContextProvider