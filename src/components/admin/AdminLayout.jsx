import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SideBar from './SideBar';
import Dashboard from './Dashboard';
import QuanLyNguoiDung from './QuanLyNguoiDung';

const AccountManager = () => <div>Quản Lý Tài Khoản Game</div>;
const TransactionManager = () => <div>Quản Lý Giao Dịch</div>;

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <SideBar />
      <div className="ml-64 p-8 w-full">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/accounts" element={<AccountManager />} />
          <Route path="/users" element={<QuanLyNguoiDung />} />
          <Route path="/transactions" element={<TransactionManager />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminLayout;
