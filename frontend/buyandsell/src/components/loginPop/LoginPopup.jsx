import React, { useContext, useState } from 'react';
import { IoMdClose } from "react-icons/io";
import "./LoginPopup.css";

import { StoreContext }  from '../../context/StoreContext';

export default function LoginPopup({setShowLogin}) {
       const [currentstate, setCurrState] = useState("Login")
       const [name ,setname] = useState('');
       const [email , setemail] = useState('');
       const [ password , setpassword] = useState('');
       const [ address , setaddress] = useState('');
       const [ phoneNo , setphoneNo] = useState('');
       const [role,  setrole] = useState('');
       const { setAuthToken } = useContext(StoreContext);
       const {setuser}  = useContext(StoreContext);
      
     
       
         

       //onchange function for input fields
        const  handleName = (e) =>{
          setname(e.target.value);
        }
         
        const handleEmail = (e) =>{
          setemail(e.target.value);
        }

        const handlePassword = (e) =>{
          setpassword(e.target.value);
        }
        const handleAddress = (e) =>{
          setaddress(e.target.value);
        }

        const handlePhoneNo = (e) =>{
          setphoneNo(e.target.value);
        }
        
         const handleRole = (e) =>{
          setrole(e.target.value);
         }
       const handleSubmit =  async(e) =>{
          e.preventDefault();
          if(currentstate === "Sign-Up")
          {
          const adduser = {name,email,password,address,phoneNo,role};
          const  response =  await fetch("http://localhost:3000/register", {
              method:"POST",
              body: JSON.stringify(adduser),
              headers:{
                   "Content-Type":"application/json",

              }
          } );
           const result =  await response.json();
           if(!response.ok)
           {
            setname("");
            setemail("");
            setpassword("");
            setaddress("");
            setphoneNo("");
            setrole("");
            console.log(result.error);
            alert(result.error)
           }

           if(response.ok)
           {
            
            console.log("user add successfully", result);
            alert("User added successfully");
            setname("");
            setemail("");
            setpassword("");
            setaddress("");
            setphoneNo("");
            setrole("");
            
           }
            
          }
          else if(currentstate == "Login")
          {
            const loginuser = {email,password,role};
           const response = await fetch("http://localhost:3000/login",{
            method:"POST",
            body: JSON.stringify(loginuser),
            headers:{
              "Content-Type":"application/json",
            }
           });
           const result = await  response.json();
           console.log("login api" ,result);
           
             if(!response.ok){
              setemail("");
              setpassword("");
              console.log(result.error);
              alert(result.error) 
             }

             if(response.ok)
             {
              const token = result.token;
              const user = result.user;
              
            
              
              localStorage.setItem("token", token);
              localStorage.setItem("user", JSON.stringify(user));
            
              setAuthToken(token);
              setuser(user)
              console.log("user login successfully", result);
              alert("User login successfully");
              setemail("");
              setpassword("");
              if(role === "Buyer")
              {
                window.location.href ="/";
              }
              
              if(role === "Seller")
               {
                window.location.href = "/sellerdashboard";
               }
             }
          }

       }
  return (
    <div  className='login-popup'>
        <form className='login-popup-container' onSubmit={handleSubmit}>
            <div className='login-popup-title'>
                <h2>{currentstate}</h2>
                 <IoMdClose  className="close" onClick={()=> setShowLogin(false)} alt="corss" />
            </div>

              <div className="login-popup-inputs">
                 {currentstate==="Login"?
                 <>
                  <input type="text" placeholder='Your email' required  value={email} onChange={handleEmail}/>
                  <input type="password" placeholder='password'   required value={password}  onChange={handlePassword}  />
                  <select  value={role} onChange={handleRole} required>
                    <option value="categories">Choose a Role</option>
                    <option value="Buyer" >Buyer</option>
                    <option value="Seller">seller</option>
                    </select>
                 </>
                 :
                   <>
                   <input type="text" placeholder=' Enter Your Name' value={name} onChange={handleName} required />
                   <input type="text" placeholder=' Enter Your Email' value={email} onChange={handleEmail} required />
                   <input type="text" placeholder='  Enter Your Address' value={address} onChange={handleAddress} required />
                   <input type="tel" placeholder='Enter Phone Number'  pattern="[0-9]{11}" value={phoneNo} onChange={handlePhoneNo} required/>
                   <input type="password" placeholder='password' value={password} onChange={handlePassword}  required />
                   <select value={role} onChange={handleRole} required>
                    <option value="categories">Choose a Role</option>
                    <option value="Buyer" >Buyer</option>
                    <option value="Seller">seller</option>
                    </select>
                   </>
                  }
                      
                   
              
              </div>
              <button type='submit'>{currentstate==="Sign-Up"? "Create account":"Login"}</button>

              <div className="login-popup-condition">
                <input type="checkbox" required />
                <p>By continuing i agree to the terms of use & privacy policy.</p>
              </div>
                   {currentstate =="Login"?   <p>Create a new account? <span onClick={()=>setCurrState("Sign-Up")}>Click here</span></p>: 
                    <p>Already have an account? <span onClick={()=>setCurrState("Login")}>Login here</span></p>}
        </form>
    </div>
  )
}
