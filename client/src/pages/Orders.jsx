import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import './Cart.css';

const BASE_URL = 'http://localhost:5000';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    let user = null;

    if (storedUser && storedUser !== 'undefined') {
      try {
        user = JSON.parse(storedUser);
      } catch {
        user = null;
      }
    }

    const headers = {};
    if (token) headers.Authorization = `Bearer ${token}`;
    if (user?.id) headers['x-user-id'] = user.id;
    return headers;
  };

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await fetch(`${BASE_URL}/api/orders`, {
          headers: getAuthHeaders(),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Unable to load orders.');
        }

        setOrders(data.orders || []);
      } catch (err) {
        console.error('Failed to load orders:', err);
        setError(err.message || 'Unable to load your orders.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <>
      <Navbar />
      <div className="cart-page">
        <div className="cart-header">
          <div>
            <p className="eyebrow">Your purchases</p>
            <h1>Order History</h1>
          </div>
        </div>

        {loading ? (
          <div className="cart-state">
            <p>Loading your orders...</p>
          </div>
        ) : error ? (
          <div className="cart-state">
            <p>{error}</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="cart-state empty-state">
            <h2>No orders yet</h2>
            <p>Your completed purchases will appear here.</p>
          </div>
        ) : (
          <div className="cart-items">
            {orders.map((order) => (
              <div className="cart-item" key={order.id} style={{ display: 'block' }}>
                <div className="item-details">
                  <h3>Order #{order.orderNumber || order.id.slice(0, 8)}</h3>
                  <p className="item-meta">Status: {order.status}</p>
                  <p className="item-price">Total: ₹{Number(order.totalAmount || 0).toLocaleString()}</p>
                  <p className="item-meta">Shipping: {order.shippingAddress}</p>
                </div>

                <div style={{ marginTop: '12px' }}>
                  {(order.items || []).map((item) => (
                    <div key={item.id} style={{ borderTop: '1px solid #eee', paddingTop: '8px', marginTop: '8px' }}>
                      <p><strong>{item.productName}</strong></p>
                      <p>Qty: {item.quantity} • Size: {item.selectedSize} • Color: {item.selectedColor}</p>
                      <p>Price: ₹{Number(item.purchasePrice || 0).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Orders;
