import React, { useContext } from 'react'
import "./CarDisplay.css";
import { StoreContext } from '../../context/StoreContext';
import Prouductitem from '../ProductItems/Prouductitem';
function CarDisplay({ category }) {
    const { products } = useContext(StoreContext);
    return (
        <div className='product-display' id='P-display'>
            <h2>Top Products near you</h2>

            <div className="P-display-list">

                {products.map((item, index) => {
                    if (category === "All" || category === item.category) {

                        return <Prouductitem key={index} id={item._id} name={item.title} description={item.description} image={`http://localhost:3000/${item.image}`} price={item.price} />
                    }

                })}

            </div>
        </div>
    )
}

export default CarDisplay
