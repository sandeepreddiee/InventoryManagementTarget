import React from 'react';
import { mockProducts } from '../mock/mockData';

const ProductList = () => (
  <div>
    <h2>Products</h2>
    <ul>
      {mockProducts.map(p => (
        <li key={p.id}>{p.name} - Stock: {p.stock}</li>
      ))}
    </ul>
  </div>
);

export default ProductList;
