import React, { useState } from 'react'
import axios from 'axios';
import Navbar from '../components/Navbar';
import { useNavigate, useLocation } from 'react-router-dom';
import './Dresses.css'

const BASE_URL = 'http://localhost:5000';

const DressesInfo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dress = location.state;
  const [selectedSize, setSelectedSize] = useState('M');
  const [addingToCart, setAddingToCart] = useState(false);

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

  const handleAddToCart = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Kindly login to continue with your purchase');
      navigate('/login');
      return;
    }

    try {
      setAddingToCart(true);
      await axios.post(
        `${BASE_URL}/api/cart`,
        {
          productId: dress._id || dress.id,
          quantity: 1,
          selectedSize,
          selectedColor: dress.color || 'Default',
        },
        {
          headers: getAuthHeaders(),
        }
      );

      alert('Item added to cart successfully!');
      navigate('/cart');
    } catch (error) {
      console.error('Add to cart failed:', error);
      alert(error.response?.data?.message || 'Unable to add the item to cart.');
    } finally {
      setAddingToCart(false);
    }
  };

  if (!dress) {
    return (
      <>
        <Navbar />
        <div className="detail-page">
          <div className="detail-card empty-state">
            <h2>No dress selected</h2>
            <p>Please select a dress first.</p>
            <button onClick={() => navigate('/dresses')}>Back to collection</button>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <div className="detail-page">
        <div className="detail-card">
          <img className="detail-image" src={dress.image} alt={dress.name} />
          <div className="detail-info">
            <h2>{dress.name}</h2>
            <h3>₹{dress.price}</h3>
            <p>{dress.description}</p>

            <div className="size-section">
              <label htmlFor="size-select">Choose size</label>
              <select
                id="size-select"
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
              >
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
              </select>
            </div>

            <div className="action-buttons">
              <button className="primary-btn" onClick={handleAddToCart} disabled={addingToCart}>
                {addingToCart ? 'Adding...' : 'Add to Cart'}
              </button>
              <button className="secondary-btn" onClick={() => navigate('/checkout')}>Proceed to Checkout</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DressesInfo
