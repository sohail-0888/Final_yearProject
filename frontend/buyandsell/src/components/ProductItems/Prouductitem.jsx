import React, { useContext } from 'react'
import "./ProductItems.css"
import { FaPlus, FaMinus } from 'react-icons/fa';
import { StoreContext } from '../../context/StoreContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Prouductitem({id,name,description,image,price}) {
                  
                  const{cartItems,addToCart, removeFromCart} = useContext(StoreContext)

                  const navigate = useNavigate();
 
  return (
    <div  className="product-item">
        <div className="product-item-img-container">
            <img   className='proudct-item-image' src={image} alt="" />
            {!cartItems[id]?
            <FaPlus  className="add"onClick={()=>addToCart(id)} />: 
            <div className='food-item-counter'>
            <FaMinus className='minus-btn' onClick={() => removeFromCart(id)} />
            <p>{cartItems[id]}</p>
            <FaPlus  className='plus-btn' onClick={() =>addToCart(id)} />
          </div>
}
        </div>
        
        <div className="product-item-info">
            <div className="product-item-name-rating">
                <p>{name}</p>
            
            </div>
             <p  className='product-item-desc'>{description}</p>
             <p className='product-item-price'>Rs{price}</p>
             <Link className='link-save' to={`/product/${id}`}>Product More Information</Link>
        </div>
      
    </div>
  )
}
