// src/components/Analytics.js
import React, { useEffect, useState } from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts';
import './Analytics.css';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#00c49f', '#ff6f61', '#a29bfe'];

const generateDummySales = () => {
  const products = ['Laptop', 'Mouse', 'Keyboard', 'Monitor', 'Headphones', 'Charger', 'USB Cable', 'Webcam'];
  const stores = ['Store A', 'Store B', 'Store C', 'Store D'];
  const sales = [];

  for (let i = 0; i < 50; i++) {
    const date = new Date(Date.now() - Math.floor(Math.random() * 7) * 86400000).toISOString().split('T')[0];
    const product = products[Math.floor(Math.random() * products.length)];
    const quantity = Math.floor(Math.random() * 10) + 1;
    const store = stores[Math.floor(Math.random() * stores.length)];
    sales.push({ date, product, quantity, store });
  }

  return sales;
};

const Analytics = () => {
  const [salesData, setSalesData] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [storeDistribution, setStoreDistribution] = useState([]);

  useEffect(() => {
    const dummyData = generateDummySales();

    // Daily Sales
    const dailyMap = {};
    const productMap = {};
    const storeMap = {};

    dummyData.forEach(({ date, product, quantity, store }) => {
      dailyMap[date] = (dailyMap[date] || 0) + quantity;
      productMap[product] = (productMap[product] || 0) + quantity;
      storeMap[store] = (storeMap[store] || 0) + quantity;
    });

    setSalesData(Object.entries(dailyMap).map(([date, sales]) => ({ date, sales })));
    setTopProducts(Object.entries(productMap).map(([name, sales]) => ({ name, sales })));
    setStoreDistribution(Object.entries(storeMap).map(([name, value]) => ({ name, value })));
  }, []);

  return (
    <div className="analytics-container">
      <h2>📈 Sales Analytics</h2>

      <div className="chart-section">
        <h3>📅 Daily Sales Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="sales" stroke="#6a11cb" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-section">
        <h3>🏆 Top Selling Products</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={topProducts}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sales">
  {topProducts.map((entry, index) => (
    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
  ))}
</Bar>

          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-section">
        <h3>🏬 Store-wise Sales Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={storeDistribution}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {storeDistribution.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Analytics;
