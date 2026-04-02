import React, { useContext } from 'react'
import './NavBar.css'
import { useState } from 'react'
import { FaCartPlus } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { IoBagOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { IoIosLogOut } from "react-icons/io";
import { StoreContext } from '../../context/StoreContext';
export default function NavBar({setShowLogin}) {
   const [menu, setMenu] = useState("home");
   const { cartItems,authToken,   setAuthToken } = useContext(StoreContext);
     
   const navigate = useNavigate();

   const logout = () =>{
      localStorage.removeItem('token');
      setAuthToken("");
      navigate("/");
   }
  //  show the total item in the cart
  const totalCartItems = Object.values(cartItems).reduce((acc,curr) => acc+curr,0);

  

  return (
    <>
     <div className="navbar">
      <img src="lo.png" alt="logo.png" className="logo" />
      <ul className="navbar-menu">
        <Link to={"/"}  id='home' onClick={()=>{setMenu("home")}} className={menu=="home"?"active":""} >Home</Link>
        <Link to={"/product"}  id='prod'  onClick={()=>{setMenu("Products")}} className={menu=="Products"?"active":""}>Products</Link>
        <li onClick={()=>{setMenu("about")}} className={menu=="about"?"active":""}>About us</li>
        <a href='#footer'  id='ft' onClick={()=>{setMenu("contact")}} className={menu=="contact"?"active":""}>Contact us</a>
        
      </ul>

      <div className="navbar-right">
      <FaSearch  style={{fontSize:"30px"}} />
        <div className="navbar-search-icon">
        <Link to='/cart'>   <FaCartPlus  style={{fontSize:"30px"}}/></Link>
          <div className="dot">{totalCartItems}</div>
        </div>
          {!authToken?<button  onClick={()=>setShowLogin(true)}>Sign in</button>:
           <div className='navbar-profile'>
               <img src="profile.jpg" alt="profile" />
                <ul className="nav-profile-dropdown">
                  <li onClick={()=>navigate('/myorders')}><IoBagOutline /><p>Orders</p></li>
                  <hr />
                  <li onClick={logout}><IoIosLogOut /><p>Logout</p></li>
                </ul>
            </div>}
        
      </div>
      </div>  
    </>
  )
}
