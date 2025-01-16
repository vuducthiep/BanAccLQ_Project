import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/thongke/theo-thang')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const salesData = {
    labels: data.map(item => `${item.thang}/${item.nam}`),
    datasets: [
      {
        label: 'Số lượng bán',
        data: data.map(item => item.soLuongBan),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  const revenueData = {
    labels: data.map(item => `${item.thang}/${item.nam}`),
    datasets: [
      {
        label: 'Doanh thu (VNĐ)',
        data: data.map(item => item.tongTien),
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Thống kê bán hàng theo tháng'
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Thống kê số lượng bán</h2>
        <Line options={options} data={salesData} />
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Thống kê doanh thu</h2>
        <Line options={options} data={revenueData} />
      </div>
    </div>
  );
};

export default Dashboard; 