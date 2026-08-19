import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './Checkout.css';

const BASE_URL = 'http://localhost:5000';

const Checkout = () => {
  const navigate = useNavigate();
  const [shippingAddress, setShippingAddress] = useState('');
  const [loading, setLoading] = useState(false);
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

  const handleCheckout = async (e) => {
    e.preventDefault();

    if (!shippingAddress.trim()) {
      setError('Please enter a shipping address.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/checkout`,
        { shippingAddress },
        { headers: getAuthHeaders() }
      );

      alert(data.message || 'Order placed successfully!');
      localStorage.setItem('cartCount', '0');
      window.dispatchEvent(new Event('cart-updated'));
      navigate('/orders');
    } catch (err) {
      console.error('Checkout failed:', err);
      setError(err.response?.data?.message || 'Unable to place your order.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="checkout-page">
        <div className="checkout-card">
          <h2>Checkout</h2>
          <form onSubmit={handleCheckout}>
            <label htmlFor="shippingAddress">Shipping Address</label>
            <textarea
              id="shippingAddress"
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
              rows="5"
              placeholder="Enter your shipping address"
            />

            {error && <p className="error-message">{error}</p>}

            <button type="submit" className="primary-btn full-width" disabled={loading}>
              {loading ? 'Placing Order...' : 'Place Order'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Checkout;
