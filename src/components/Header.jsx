import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link từ react-router-dom
import LoginModal from './LoginModal'; // Import the LoginModal component

const Header = () => {
    const [showModal, setShowModal] = useState(false);
    const [userId, setUserId] = useState(null);
    const [avatar, setAvatar] = useState(null); // state để lưu avatar
    const [showDropdown, setShowDropdown] = useState(false);

    // Kiểm tra trong localStorage khi component được render
    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            setUserId(storedUserId); // Nếu có userId, cập nhật state
            fetchUserData(storedUserId); // Gọi API để lấy thông tin người dùng
        }
    }, []);

    const fetchUserData = async (userId) => {
        try {
            const response = await fetch(`http://localhost:8080/api/nguoidung/${userId}`);
            const data = await response.json();
            if (response.ok) {
                console.log("Received Avatar URL:", data.anhDaiDien); // Kiểm tra dữ liệu
                setAvatar(data.anhDaiDien); // Cập nhật avatar
            } else {
                console.error('Lỗi khi lấy thông tin người dùng');
            }
        } catch (error) {
            console.error('Lỗi kết nối API:', error);
        }
    };
    

    const handleLoginClick = () => {
        setShowModal(true); // Hiện modal khi nhấn nút đăng nhập
    };

    const handleCloseModal = () => {
        setShowModal(false); // Đóng modal khi nhấn ngoài modal hoặc nhấn nút đóng
    };

    const handleLogout = () => {
        localStorage.removeItem('userId'); // Xóa userId khỏi localStorage
        setUserId(null); // Cập nhật lại state userId
        setAvatar(null); // Xóa avatar
    };

    return (
        <div className="flex flex-col md:flex-row items-center justify-between p-4 bg-gray-100" style={{ backgroundImage: 'url(https://quatangcaominh.com/wp-content/uploads/2023/12/y-nghia-nam-con-rong-1.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>

            {/* Logo */}
            <div className="flex items-center mb-4 md:mb-0 w-48" >
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
                <Link to="/history" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                    LỊCH SỬ MUA
                </Link>
                <Link to="/recharge" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                    NẠP XU
                </Link>
            </div>

            {/* Kiểm tra userId và hiển thị avatar hoặc nút đăng nhập */}
            <div className="mt-4 md:mt-0 w-36">
                {userId ? (
                    // Nếu có userId, hiển thị avatar và menu tùy chọn khi hover
                    <div className="relative">
                        <img
                            src={avatar || 'https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg'} // Hiển thị avatar nếu có, nếu không thì dùng placeholder
                            alt="Avatar"
                            className="h-14 w-14 rounded-full cursor-pointer"
                            onClick={() => setShowDropdown(!showDropdown)}
                            
                        />
                        {showDropdown && (
                            <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md">
                                <Link
                                    to="/profile"
                                    className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                                >
                                    Thông tin cá nhân
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
                                >
                                    Đăng xuất
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    // Nếu không có userId, hiển thị nút đăng nhập
                    <button
                        onClick={handleLoginClick}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
                    >
                        Đăng nhập
                    </button>
                )}
            </div>

            {/* Show LoginModal when showModal is true */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <LoginModal onClose={handleCloseModal} /> {/* Pass close function to LoginModal */}
                    
                    <div 
                        className="fixed inset-0 bg-black opacity-50 z-40" 
                        onClick={handleCloseModal} 
                    ></div>
                </div>
            )}
        </div>
    );
};

export default Header;
