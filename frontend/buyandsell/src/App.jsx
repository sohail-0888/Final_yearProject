import React, { useState } from 'react';
import NavBar from './components/navbar/NavBar.';
import {Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Cart from  './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer';
import Products from './components/ProductPage/Products';
import LoginPopup from './components/loginPop/LoginPopup';
import SProdP from './components/SinglProductPage/SProdP';
import Seller from './components/seller/Seller';
import SellerAdd from './components/SellerAdd/SellerAdd';
import SellerList from './components/SellerList/SellerList';
import Verify from './pages/verify/Verify';
import MyOrder from './pages/MyOrders/MyOrder';





export default function App() {
      const [showLogin, setShowLogin]  = useState(false);
  return (
    <> 
      {showLogin?<LoginPopup  setShowLogin={setShowLogin}/>:<></>}
      <div className="app">
        <NavBar  setShowLogin={setShowLogin}/>
        <Routes>
         <Route path='/' element={<Home/>}></Route>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/order' element={<PlaceOrder/>}/>
          <Route path='/verify' element={<Verify/>}/>
          <Route path='/product' element={<Products/>}></Route>
           <Route path='/Product/:id' element={<SProdP/>}></Route> 
           <Route path="/myorders" element={<MyOrder/>}></Route> 
          
        
           {/* Seller Dashboard with nested routing */}
        <Route path="/sellerdashboard" element={<Seller />}>
          {/* Default: List view */}
          <Route index element={<SellerList />} />
          {/* /sellerdashboard/add → Add form */}
          <Route path="add" element={<SellerAdd />} />
          {/* /sellerdashboard/list → List view */}
          <Route path="list" element={<SellerList />} />
        </Route>
        </Routes>
      </div>

      

     
      <Footer/>
    </>
  )
}
