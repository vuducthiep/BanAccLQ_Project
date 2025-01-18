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

const QuanLyNguoiDung = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/thongke/nguoidung/theo-thang')
      .then(response => response.json())
      .then(data => setUserData(data))
      .catch(error => console.error('Error fetching user data:', error));
  }, []);

  const chartData = {
    labels: userData.map(item => `${item.thang}/${item.nam}`),
    datasets: [
      {
        label: 'Số lượng người dùng mới',
        data: userData.map(item => item.nguoiDung),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
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
        text: 'Thống kê người dùng đăng ký theo tháng'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1
        }
      }
    }
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-6">Quản lý người dùng</h2>
        
        {/* Biểu đồ thống kê */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Thống kê người dùng mới</h3>
          <div className="h-[400px]">
            <Line options={options} data={chartData} />
          </div>
        </div>

        {/* Có thể thêm bảng danh sách người dùng ở đây */}
      </div>
    </div>
  );
};

export default QuanLyNguoiDung; 