import React, { useEffect, useState } from 'react'
import './Header.css';

export default function Header() {
   const heroImages= ['hero1.jpg','hero2.jpg','hero3.jpg'];
   const [ImgIndex, setImgIndx] = useState(0);
   
   useEffect(() => {
    
       const inteval = setInterval(() => {
       
          setImgIndx(prev=>(prev+1)%heroImages.length);
         
       }, 2000);
       return () => clearInterval(inteval);
   }, [])
   
  return (
    <div className='header'>
      <img src={heroImages[ImgIndex]} alt="" />
      <div className="header-contents">
        <h2>One Platform Endless Second-Hand Deals  </h2>
         <h3>BUY AND SELL PRE OWNED GOOD</h3>
         <p>Discover unbeatable deals on trusted second-hand items — save money, reduce waste, and find value in every purchase.</p>
         
        <button> Veiw Products</button>
      </div>
    </div>
  )
}
