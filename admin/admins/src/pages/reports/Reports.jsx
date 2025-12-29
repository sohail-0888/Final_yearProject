import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import './Reports.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Reports() {
  const [reports, setReports] = useState([]);

  // Fetching reports from the backend
  const fetchReports = async () => {
      try {
          const response = await fetch("http://localhost:3000/allreport",{
            method:"GET"
          });
          const result = await response.json();
          setReports(result);
      } catch (error) {
          console.log(error);
      }
  };

  useEffect(() => {
    fetchReports();
}, []);
  return (
    
    <>
     <div className="list add flex-col">
            <div className="list-report">
                <div className="list-table-report title">
                    <b>Report Image</b>
                    <b>Report Product Name</b>
                    <b>Reporter Name</b>
                    <b>Description</b>
                    <b>Action</b>
                </div>
                {reports.map((report) => (
                    <div key={report._id} className="list-table-report">
                        <img src="report.png" alt="report img" />
                        <p>{report.product ? report.product.title : "Product deleted"}</p>
                        <p>{report.user.name}</p>   
                        <p>{report.description}</p> 
                        <p onClick={() => removeReport(report._id)} className='cursor'>x</p>
                    </div>
                ))}
            </div>
            <ToastContainer position="top-right" autoClose={2000} />
        </div>
   
      
    </>
  )
}
