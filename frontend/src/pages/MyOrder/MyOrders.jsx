import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';
import axios from 'axios';
import "./MyOrder.css"

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);  // Add a loading state
  const [error, setError] = useState(null); // Add an error state

  const fetchOrder = async () => {
    try {
      const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } });
      if (response.data.success) {
        setData(response.data.data);
      } else {
        setError('Failed to fetch orders.');
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError('Error fetching orders.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrder();
    }
  }, [token]);

  if (loading) {
    return <div className="container"><p>Loading...</p></div>;
  }

  if (error) {
    return <div className="container"><p>{error}</p></div>;
  }

  return (
    <div className='my-orders'>
      <h2>My Orders</h2>
      <div className="container">
        {data.length > 0 ? data.map((order, index) => (
          <div key={index} className="my-orders-order">
            <img src={assets.parcel_icon} alt="Parcel Icon" />
            <p>{order.items.map((item, index) => (
              <span key={index}>
                {item.name} x {item.quantity}{index !== order.items.length - 1 ? ", " : ""}
              </span>
            ))}</p>
            <p>${order.amount}.00</p>
            <p>Items: {order.items.length}</p>
            <p>
              <span>&#x25cf;</span><b>{order.status}</b>
              <button onClick={fetchOrder}>Track Order</button>
            </p>
          </div>
        )) : <p>No orders found.</p>}
      </div>
    </div>
  );
}

export default MyOrders;