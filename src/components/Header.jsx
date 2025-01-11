import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LoginModal from './LoginModal';

const Header = () => {
    const [showModal, setShowModal] = useState(false);
    const [userId, setUserId] = useState(null);
    const [avatar, setAvatar] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            setUserId(storedUserId);
            fetchUserData(storedUserId);
        }
    }, []);

    const fetchUserData = async (userId) => {
        try {
            const response = await fetch(`http://localhost:8080/api/nguoidung/${userId}`);
            const data = await response.json();
            if (response.ok) {
                setAvatar(data.anhDaiDien);
            } else {
                console.error('Lỗi khi lấy thông tin người dùng');
            }
        } catch (error) {
            console.error('Lỗi kết nối API:', error);
        }
    };

    const handleLoginClick = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);
    const handleLogout = () => {
        localStorage.removeItem('userId');
        setUserId(null);
        setAvatar(null);
    };

    const toggleMenu = () => setShowMenu(!showMenu);

    return (
        <div className="relative">
            {/* Avatar cố định ở góc trên bên phải cho màn hình nhỏ */}
            {userId && (
                <div className="absolute top-2 right-14 md:hidden z-10"> {/* Adjust right position to create space */}
                    <img
                        src={avatar || 'https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg'}
                        alt="Avatar"
                        className="h-10 w-10 rounded-full cursor-pointer"
                        onClick={() => setShowDropdown(!showDropdown)}
                    />
                    {showDropdown && (
                        <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md z-20">
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
            )}

            <div className="flex flex-col md:flex-row items-center justify-between p-4 bg-gray-100" style={{ backgroundImage: 'url(https://quatangcaominh.com/wp-content/uploads/2023/12/y-nghia-nam-con-rong-1.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>

                {/* Logo */}
                <div className="flex items-center mb-4 md:mb-0 w-full md:w-auto justify-between">
                    <img src="https://lienquanshop.vn/Data/upload/images/Adv/logo.png" alt="Logo" className="h-12" />
                    <button className="md:hidden text-gray-600 focus:outline-none z-10" onClick={toggleMenu}>
                        <span className="material-icons">menu</span>
                    </button>
                </div>

                {/* Hamburger menu */}
                <div className={`flex-col md:flex md:flex-row md:items-center md:space-x-4 ${showMenu ? 'flex' : 'hidden'}`}>
                    <Link to="/" className="px-4 py-2 bg-blue-500 text-center text-white rounded hover:bg-blue-700">
                        TRANG CHỦ
                    </Link>
                    <Link to="/favorites" className="px-4 py-2 bg-blue-500 text-center text-white rounded hover:bg-blue-700">
                        ACC YÊU THÍCH CỦA BẠN
                    </Link>
                    <Link to="/search" className="px-4 py-2 bg-blue-500 text-center text-white rounded hover:bg-blue-700">
                        TÌM KIẾM ACC
                    </Link>
                    <Link to="/history" className="px-4 py-2 bg-blue-500 text-center text-white rounded hover:bg-blue-700">
                        LỊCH SỬ MUA
                    </Link>
                    <Link to="/recharge" className="px-4 py-2 bg-blue-500 text-center text-white rounded hover:bg-blue-700">
                        NẠP XU
                    </Link>
                </div>

                {/* Đăng nhập */}
                <div className="mt-4 md:mt-0 w-36 hidden md:block">
                    {userId ? (
                        <div className="relative">
                            <img
                                src={avatar || 'https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg'}
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
                        <button
                            onClick={handleLoginClick}
                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
                        >
                            Đăng nhập
                        </button>
                    )}
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <LoginModal onClose={handleCloseModal} />
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
