import React, { useContext, useEffect, useState } from 'react';
import "./Verify.css";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const { url } = useContext(StoreContext);
  const navigate = useNavigate();
  const [verificationStatus, setVerificationStatus] = useState(null); // State to track verification status

  console.log(success, orderId);

  const verifyPayment = async () => {
    try {
      const response = await axios.post(url + "/api/order/verify", { success, orderId });
      if (response.data.success) {
        setVerificationStatus('success');
        setTimeout(() => navigate("/myorders"), 2000); // Redirect to my orders after 2 seconds
      } else {
        setVerificationStatus('failure');
        setTimeout(() => navigate("/"), 2000); // Redirect to home after 2 seconds
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      setVerificationStatus('failure');
      setTimeout(() => navigate("/"), 2000); // Redirect to home after 2 seconds
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div className='verify'>
      {verificationStatus === null ? (
        <div className="spinner"></div>
      ) : verificationStatus === 'success' ? (
        <div className="success-message">
          <div className="tick-mark">✔️</div>
          <p>Order Placed Successfully</p>
        </div>
      ) : (
        <div className="failure-message">
          <p>Order Verification Failed</p>
        </div>
      )}
    </div>
  );
};

export default Verify;
