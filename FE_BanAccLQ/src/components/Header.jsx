import React from 'react';
import { Link } from 'react-router-dom'; // Import Link từ react-router-dom

const Header = () => {
    return (
        <div className="flex flex-col md:flex-row items-center justify-between p-4 bg-gray-100">
            {/* Logo */}
            <div className="flex items-center mb-4 md:mb-0">
                <img src="https://lienquanshop.vn/Data/upload/images/Adv/logo.png" alt="Logo" className="h-12" />
            </div>
            
            {/* Buttons ở giữa */}
            <div className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0">
                <Link to="/" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                    TRANG CHỦ
                </Link>
                <Link to="/favorites" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                    ACC YÊU THÍCH CỦA BẠN
                </Link>
                <Link to="/search" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                    TÌM KIẾM ACC
                </Link>
                <Link to="/support" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                    HỖ TRỢ
                </Link>
                <Link to="/recharge" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                    NẠP XU
                </Link>
            </div>
            
            {/* Button Đăng nhập */}
            <div className="mt-4 md:mt-0">
                <Link to="/login">
                    <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700">
                        Đăng nhập
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Header;
