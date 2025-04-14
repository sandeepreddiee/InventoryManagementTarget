// src/components/SalesHistory.js
import React, { useState } from 'react';
import './SalesHistory.css';

const getDateDaysAgo = (days) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString().split('T')[0];
};

const today = getDateDaysAgo(0);
const yesterday = getDateDaysAgo(1);
const last7Days = Array.from({ length: 7 }, (_, i) => getDateDaysAgo(i));

const allSalesData = [
  { date: today, item: 'Apple iPhone 15', quantity: 5 },
  { date: today, item: 'Samsung Smart TV 55"', quantity: 2 },
  { date: today, item: 'HP Wireless Mouse', quantity: 9 },
  { date: today, item: 'Sony Soundbar', quantity: 3 },

  { date: yesterday, item: 'Fitbit Charge 5', quantity: 4 },
  { date: yesterday, item: 'LG 32" Monitor', quantity: 2 },
  { date: yesterday, item: 'Logitech Keyboard', quantity: 6 },
  { date: yesterday, item: 'Echo Dot Gen 5', quantity: 7 },

  { date: getDateDaysAgo(2), item: 'Bose QC45 Headphones', quantity: 3 },
  { date: getDateDaysAgo(2), item: 'Xbox Series S', quantity: 5 },
  { date: getDateDaysAgo(2), item: 'HP Printer', quantity: 2 },

  { date: getDateDaysAgo(3), item: 'Apple iPad Air', quantity: 4 },
  { date: getDateDaysAgo(3), item: 'Google Pixel 8', quantity: 6 },

  { date: getDateDaysAgo(4), item: 'Sony WH-1000XM5', quantity: 2 },
  { date: getDateDaysAgo(4), item: 'Canon EOS M50', quantity: 1 },
  { date: getDateDaysAgo(4), item: 'Seagate 2TB HDD', quantity: 8 },

  { date: getDateDaysAgo(5), item: 'PlayStation 5 Controller', quantity: 6 },
  { date: getDateDaysAgo(5), item: 'Microsoft Surface Laptop', quantity: 2 },

  { date: getDateDaysAgo(6), item: 'Apple Watch Series 9', quantity: 3 },
  { date: getDateDaysAgo(6), item: 'Anker Power Bank', quantity: 7 },
  { date: getDateDaysAgo(6), item: 'Kindle Paperwhite', quantity: 2 },

  { date: getDateDaysAgo(7), item: 'Roku Streaming Stick+', quantity: 5 },
  { date: getDateDaysAgo(7), item: 'Google Nest Hub', quantity: 4 }
];

const SalesHistory = () => {
  const [filter, setFilter] = useState('today');

  const filteredSales = allSalesData.filter((sale) => {
    if (filter === 'today') return sale.date === today;
    if (filter === 'yesterday') return sale.date === yesterday;
    if (filter === 'last7') return last7Days.includes(sale.date);
    return true;
  });

  return (
    <div className="sales-history-card">
      <div className="sales-header">
        <h2>📊 Sales History</h2>
        <select className="sales-filter" onChange={(e) => setFilter(e.target.value)} value={filter}>
          <option value="today">Today</option>
          <option value="yesterday">Yesterday</option>
          <option value="last7">Last 7 Days</option>
        </select>
      </div>

      <table className="sales-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Item</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {filteredSales.length > 0 ? (
            filteredSales.map((sale, index) => (
              <tr key={index}>
                <td>{sale.date}</td>
                <td>{sale.item}</td>
                <td>{sale.quantity}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="no-sales">No sales found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SalesHistory;
