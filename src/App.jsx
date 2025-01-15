import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Các component trong thư mục 'user'
import Header from './components/user/Header';
import Banner from './components/user/Banner';
import Prominent from './components/user/Prominent';
import ListAcc from './components/user/ListAcc';
import Profile from './components/user/Profile';
import AccDetail from './components/user/AccDetail';
import Footer from './components/user/Footer';
import AccYeuThich from './components/user/AccYeuThich';
import NapTien from './components/user/NapTien';
import HomePage from './components/user/HomePage';
import LichSuMua from './components/user/LichSuMua';
import Search from './components/user/Search';
import ThanhToan from './components/user/ThanhToan';
import AdminLayout from './components/admin/AdminLayout';

// Layout cho các trang chỉ giữ lại Header và Footer
const HeaderFooterLayout = ({ children }) => (
  <div>
    <Header />
    {children}
    <Footer />
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Trang chính với layout đầy đủ */}
        <Route path="/" element={<HomePage />} />
        
        {/* Trang chi tiết tài khoản với chỉ Header và Footer */}
        <Route path="/acc/:id" element={<HeaderFooterLayout><AccDetail /></HeaderFooterLayout>} />
        
        {/* Trang thông tin cá nhân với Header và Footer */}
        <Route path="/profile" element={<HeaderFooterLayout><Profile /></HeaderFooterLayout>} />
        
        {/* Trang yêu thích với Header và Footer */}
        <Route path="/favorites" element={<HeaderFooterLayout><AccYeuThich /></HeaderFooterLayout>} />
        
        {/* Trang thanh toán tài khoản */}
        <Route path="/thanhtoan/:accId" element={<HeaderFooterLayout><ThanhToan /></HeaderFooterLayout>} />
        
        {/* Trang nạp tiền */}
        <Route path="/recharge" element={<HeaderFooterLayout><NapTien /></HeaderFooterLayout>} />
        
        {/* Lịch sử mua */}
        <Route path="/history" element={<HeaderFooterLayout><LichSuMua /></HeaderFooterLayout>} />
        
        {/* Tìm kiếm */}
        <Route path="/search" element={<HeaderFooterLayout><Search /></HeaderFooterLayout>} />

        <Route path="/admin/*" element={<AdminLayout />} />

      </Routes>
    </Router>
  );
}

export default App;
