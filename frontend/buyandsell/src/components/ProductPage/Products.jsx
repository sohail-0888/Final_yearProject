import React, { useContext, useState } from 'react';
import './Products.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

export default function Products() {
  const { products,addToCart,addToReport } = useContext(StoreContext);
   const [showModal, setshowModal] = useState(false);
    const [seletedProductId, setseletedProductId] = useState(false);
    const [reportDescription, setReportDescription] = useState('');

    const navigate = useNavigate();

  const [filters, setfilters] = useState({
    keywords: '',
    category: '',
    minPrice: '',
    maxprice: '',
    location: '',
    condition: ''
  });

  const handleInputChange = (e) => {
    setfilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const filteredProducts = products.filter((product) => {
    const title = product.title?.toLowerCase() || '';
    const description = product.description?.toLowerCase() || '';
    const category = product.category?.toLowerCase() || '';
    const location = product.location?.toLowerCase() || '';
    const condition = product.condition?.toLowerCase() || '';

    const keywords = filters.keywords.toLowerCase();
    const filterCategory = filters.category.toLowerCase();
    const filterLocation = filters.location.toLowerCase();
    const filterCondition = filters.condition.toLowerCase();
    const minPrice = parseFloat(filters.minPrice) || 0;
    const maxPrice = parseFloat(filters.maxprice) || Infinity;

    return (
      (!keywords || title.includes(keywords) || description.includes(keywords)) &&
      (!filterCategory || category === filterCategory) &&
      (!filterLocation || location.includes(filterLocation)) &&
      (!filterCondition || condition === filterCondition) &&
      product.price >= minPrice &&
      product.price <= maxPrice
    );
  });

    const handleModalOpen = (productId) =>{
      setseletedProductId(productId);
      setshowModal(true);
    }

    const handleModalClose = () =>{
      setshowModal(false);
      setseletedProductId(null);
    }

    const handleFormSubmit = async (e) =>{
      e.preventDefault();
      const result = await addToReport(seletedProductId,reportDescription);
      if(result.success){
        console.log(result.message);
        setshowModal(false);
      }
      else{
        alert("Failed to Submit report");
      }

    }

  return (
    <div className="product-page">
      <div className="search-filters">
        <h2>Search Filters</h2>
        <form onSubmit={handleSubmit}>
          <div className="filter-group">
            <label htmlFor="keywords">Keywords:</label>
            <input
              type="text"
              id="keywords"
              name="keywords"
              value={filters.keywords}
              onChange={handleInputChange}
            />
          </div>
          <div className="filter-group">
            <label htmlFor="category">Category:</label>
            <select
              id="category"
              name="category"
              value={filters.category}
              onChange={handleInputChange}
            >
              <option value="">Select Category</option>
              <option value="electronics">Electronics</option>
              <option value="furniture">Furniture</option>
              <option value="clothing">Clothing</option>
              <option value="mobiles">Mobiles</option>
              <option value="bikes">Bikes</option>
              <option value="cars">cars</option>
              
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="price-range">Price Range:</label>
            <input
              type="number"
              id="min-price"
              name="minPrice"
              placeholder="Min"
              value={filters.minPrice}
              onChange={handleInputChange}
            />
            <input
              type="number"
              id="max-price"
              name="maxprice"
              placeholder="Max"
              value={filters.maxprice}
              onChange={handleInputChange}
            />
          </div>
          <div className="filter-group">
            <label htmlFor="location">Location:</label>
            <input
              type="text"
              id="location"
              name="location"
              value={filters.location}
              onChange={handleInputChange}
            />
          </div>
          <div className="filter-group">
            <label htmlFor="condition">Condition:</label>
            <select
              id="condition"
              name="condition"
              value={filters.condition}
              onChange={handleInputChange}
            >
              <option value="">Select Condition</option>
              <option value="new">New</option>
              <option value="old">Used</option>
            </select>
          </div>
          <button type="submit">Search</button>
        </form>
      </div>

      <div className="product-display">
        <h2>Products</h2>
        {filteredProducts.length>0?(  <div className="product-list">
          {filteredProducts.map((item, index) => (
            <div className="product-card" key={index}>
              <img
                src={`http://localhost:3000/${item.image}`}
                alt="Product"
                className="product-image"
              />
              <div className="product-details">
                <h3 className="product-title">{item.title}</h3>
                <p className="product-price">{item.price}</p>
                <p className="product-description">{item.description}</p>
                <button className="add-to-cart-button" onClick={()=>{addToCart(item._id); navigate('/cart')}}>Add to Cart</button>
                <button className="add-to-Report-button" onClick={()=>handleModalOpen(item._id)} >Report TO Product</button>
               
              </div>
            </div>
          ))}
        </div>):<p>No product</p>}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <h3>Report Product</h3>
            <form onSubmit={handleFormSubmit}>
              <textarea name="description" placeholder='Describe the issue' rows="5" required value={reportDescription} onChange={(e) => setReportDescription(e.target.value)}></textarea>
           <button className='S-btn' type='submit'>Submit Report</button>
            </form>
            <button className="close-modal" onClick={handleModalClose}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
