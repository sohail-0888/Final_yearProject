import React from 'react'
import './Footer.css';
import { TiSocialFacebookCircular,TiSocialTwitterCircular,TiSocialInstagramCircular } from "react-icons/ti";
export default function Footer() {
  return (
    <div  className='footer' id='footer'>
         <div className="footer-content">
            <div className='footer-content-left'>
              <img src="lo.png" alt="logo" />
              <p>Connecting buyers and sellers of quality pre-owned goods. Trusted deals, safe transactions, and value for every purchase.</p>
              <div className="footer-social-icons">
              <TiSocialFacebookCircular className='icon' />
                <TiSocialTwitterCircular className='icon' />
                <TiSocialInstagramCircular className='icon' />
              </div>
            </div>
            <div className='footer-content-center'>
                <h2>COMPANY</h2>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
            </div>
            <div className='footer-content-right'>
                 <h2>GET IN TOUCH</h2>
                 <ul>
                    <li>+9230110140000</li>
                    <li>buyandsellpreownedgood12@gmail.com</li>
                 </ul>  
            </div>
         </div>
         <hr />
         <p className="footer-copyright"> Copyt right © 2025 Buy & Sell. All rights reserved.</p>
    </div>
  )
}
