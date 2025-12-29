import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import './SProdP.css';

export default function SProdP() {
  const [Number, setNumber] = useState(false);
  const [product, setProduct] = useState('');
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();
  const { addToCart, addToReport } = useContext(StoreContext);

  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchsingleprod = async () => {
      try {
        const response = await fetch(`http://localhost:3000/SProd/${id}`, {
          method: "GET",
          headers: {
            "content-Type": "application/json",
          },
        });

        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchsingleprod();
  }, [id]);

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {     
    setShowModal(false);
  };

 
   const handleFormSubmit = async (e) =>{
      e.preventDefault();
      const description = e.target.description.value;
      const result = await addToReport(product._id,description);

      if(result.success)
      {
         console.log(result.message);
         
        setShowModal(false)
      }
      else{
        alert("failed to submit report")
        
      }
   }
  return (
    <div className='container'>
      <div className="left-container">
        <div className="p-img">
          <img src={`http://localhost:3000/${product.image}`} alt="product" />
        </div>

        <div className="p-price">
          <div>
            <h2>{product.price}</h2>
          </div>
        </div>

        <div className="description">
          <h3>Description</h3>
          <span>{product.description}</span>
        </div>

        <div className="cart-btn">
          <button className='c-btn' onClick={handleModalOpen}>Report To Product</button>
          <button className='c-btn' onClick={() => { addToCart(product._id); navigate('/cart'); }}>ADD To Cart</button>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <h3>Report to Product</h3>
            <form onSubmit={handleFormSubmit}>
              <textarea name="description" placeholder="Describe the issue..." rows="5" required></textarea>
              <button className='s-btn' type="submit">Submit Report</button>
            </form>
            <button className="close-modal" onClick={handleModalClose}>Close</button>
          </div>
        </div>
      )}

      <div className="right-container">
        <div className="seller-info">
          <h2>Contact To Seller</h2>
          <div className="seller-sub">
            <div>
              <img src="/sellericon.png" alt="Seller" />
            </div>
            <div className='seller-name'>
              <h3>{product.seller?.name}</h3>
              <h3>{product.seller?.address}</h3>
            </div>
          </div>
        </div>

        <div className="seller-b">
          {!Number ? (
            <button onClick={() => { setNumber(true); }} className='seller-btn'>
              Contact to seller
            </button>
          ) : (
            <button onClick={() => { setNumber(false); }} className='seller-btn'>
              Seller No {product.seller?.phoneNo}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
