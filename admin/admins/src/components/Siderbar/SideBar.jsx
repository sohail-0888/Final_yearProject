import React from 'react'
import './Sidebar.css'
import { BiSolidAddToQueue } from "react-icons/bi";
import { FaList } from "react-icons/fa6";
import { NavLink } from 'react-router-dom';
import { GoReport } from "react-icons/go";
import { GiShoppingCart } from "react-icons/gi";
import { FaUserTie } from "react-icons/fa6";

export default function SideBar() {
  return (
    <div  className='sidebar'>
        <div className="sidebar-options">
       
            
            <NavLink to='/List' className="sidebar-option">
                  <FaList />
                <p>List Items</p>
            </NavLink>

            <NavLink to='/Orders' className="sidebar-option">
              <GiShoppingCart />
                <p>Orders</p>
            </NavLink>

            <NavLink to='/report' className="sidebar-option">
                   <GoReport />
                <p>Report</p>
            </NavLink>


            <NavLink to='/AllUser' className="sidebar-option"> 
                      <FaUserTie />
                    <p>All register user</p>
            </NavLink>

        </div>
    </div>
  )
}
