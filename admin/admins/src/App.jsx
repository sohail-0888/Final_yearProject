import React from 'react'
import Navbar from './components/Navbar/Navbar'
import SideBar from './components/Siderbar/SideBar'
import { Route, Routes } from 'react-router-dom'
import List from './pages/List/List'

import Order from './pages/Orders/Order'
import Reports from './pages/reports/reports'
import RegUser from './pages/RegisterUser/RegUser'

function App() {
  return (
    <div>
       <Navbar/>
       <hr/>
       <div className="app-content">
         <SideBar/> 
         <Routes>
          
          <Route path="/list" element={<List/>}></Route>
          <Route path="/orders" element={<Order/>}></Route>
          <Route path="/report" element={<Reports/>}></Route>
          <Route path='/AllUser' element={<RegUser/>}></Route>
         </Routes>
       </div>
    </div>
  )
}

export default App
