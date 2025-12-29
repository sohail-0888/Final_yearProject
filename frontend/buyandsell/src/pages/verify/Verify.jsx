import React, { useEffect } from 'react';
import './Verify.css';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function Verify() {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const navigate = useNavigate();

  const verifyPayment = async () => {
    try {
      const response = await fetch("http://localhost:3000/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify({ success, orderId }), 
      });

      const data = await response.json();

      if (data.success) {
        navigate("/myorders"); 
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Error during payment verification:", error);
      navigate("/"); 
    }
  };

  useEffect(() => {
    verifyPayment(); 
  }, []);

  return (
    <div className='verify'>
      <div className="spinner"></div>
    </div>
  );
}
