import React from 'react';

const Header = () => {
    return (
        <div className="flex flex-col md:flex-row items-center justify-between p-4 bg-gray-100">
            {/* Logo */}
            <div className="flex items-center mb-4 md:mb-0">
                <img src="https://lienquanshop.vn/Data/upload/images/Adv/logo.png" alt="Logo" className="h-12" />
            </div>
            
            {/* Buttons ở giữa */}
            <div className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0">
                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">TRANG CHỦ</button>
                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">ACC YÊU THÍCH CỦA BẠN</button>
                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">TÌM KIẾM ACC</button>
                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">HỖ TRỢ</button>
                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">NẠP XU</button>
            </div>
            
            {/* Button Đăng nhập */}
            <div className="mt-4 md:mt-0">
                <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700">Đăng nhập</button>
            </div>
        </div>
    );
}

export default Header;
