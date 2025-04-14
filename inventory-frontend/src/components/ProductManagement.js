import React, { useState, useEffect } from 'react';
import './ProductManagement.css';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [prevQuantities, setPrevQuantities] = useState({});
  const [flashKeys, setFlashKeys] = useState({});
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchProducts = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      const token = storedUser?.id_token;
  
      if (!token) {
        console.warn('No token found');
        return;
      }
  
      const response = await fetch('http://localhost:8081/api/products', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        const text = await response.text();
        console.error('Fetch failed:', text);
        return;
      }
  
      const data = await response.json();
      const newFlashKeys = {};
      const updatedPrevQuantities = {};
  
      data.forEach((product) => {
        const prevQty = prevQuantities[product.product_id];
        const currentQty = product.quantity;
  
        if (prevQty !== undefined && currentQty !== prevQty) {
          newFlashKeys[product.product_id] = `${product.product_id}-${Date.now()}`;
          console.log(`⚡ Flash triggered for ${product.name}: ${prevQty} → ${currentQty}`);
        }
  
        updatedPrevQuantities[product.product_id] = currentQty;
      });
  
      console.log('🔁 Updated flashKeys:', newFlashKeys);
      console.log('📦 Updated products:', data);
  
      setFlashKeys(newFlashKeys);
      setProducts(data);
      setPrevQuantities(updatedPrevQuantities);
      setLastUpdated(new Date().toLocaleTimeString());
  
    } catch (err) {
      console.error('❌ Error fetching products:', err.message);
    }
  };
  

  useEffect(() => {
    fetchProducts();
    const interval = setInterval(fetchProducts, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="product-management-container">
      <div className="header-bar">
        <h2>📦 Product Management</h2>
        <span className="updated">Last updated: {lastUpdated || 'Loading...'}</span>
      </div>

      <div className="product-management-card">
        <table className="product-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => {
                const key = flashKeys[product.product_id] || product.product_id;
                return (
                  <tr key={key} className="flashable-row">
                    <td>{product.name}</td>
                    <td>{product.quantity}</td>
                    <td>{product.category || '—'}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="3" style={{ textAlign: 'center' }}>
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManagement;
