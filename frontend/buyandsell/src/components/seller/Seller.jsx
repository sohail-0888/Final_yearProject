import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './Seller.css';
import { BiSolidAddToQueue } from "react-icons/bi";

export default function Seller() {
  return (
    <div className="seller-dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-options">
          <NavLink
            to="add"
            end
            className={({ isActive }) =>
              isActive ? 'active sidebar-option' : 'sidebar-option'
            }
          >
            <BiSolidAddToQueue />
            <p>Add Items</p>
          </NavLink>
          <NavLink
            to="list"
            className={({ isActive }) =>
              isActive ? 'active sidebar-option' : 'sidebar-option'
            }
          >
            <p>List Items</p>
          </NavLink>
        </div>
      </div>

      {/* Content area for nested routes */}
      <div className="seller-content">
        <Outlet />
      </div>
    </div>
  );
}
