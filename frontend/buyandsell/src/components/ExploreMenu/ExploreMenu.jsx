import React from 'react'
import "./ExploreMenu.css"
export default function ExploreMenu({category,setCategory}) {

      const menulist = [
        {name:"cars",  image:"./car.png"},
        {name:"bikes" ,  image:"./bikes.png"},
        {name:"Electronics", image:"./electronics.png"},
        {name:"Furniture", image:"./furniture.png"},
        {name:"mobiles", image:"./mobiles.png"},
        
        
      ]
  return (
    <div className='explore-menu ' id='explore-menu'>
       <h1>Explore the categories</h1>
       <p className='explore-menu-text'>Browse through a wide range of pre-owned products — from electronics to furniture — all carefully listed for quality and value. Find exactly what you need, at prices you'll love.</p>
        <div className="explore-menu-list">
            {menulist.map((item,index) =>(
                       <div   key={index}  onClick={()=>setCategory(prev=>prev===item.name?"All":item.name)} className="explore-menu-list-item">
                       <img   className={category===item.name?"active":""}src={item.image} alt="product images" />
                       <p>{item.name}</p>
                   </div>
            ))}
          

         
            
         
        </div>
        <hr />
    </div>
  )
}
