import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import LoginModal from './LoginModal';

const Header = () => {
    const [showModal, setShowModal] = useState(false);
    const [userId, setUserId] = useState(null);
    const [avatar, setAvatar] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    const dropdownRef = useRef(null); // Tham chiếu đến dropdown menu
    const avatarRef = useRef(null); // Tham chiếu đến avatar

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            setUserId(storedUserId);
            fetchUserData(storedUserId);
        }

        // Sự kiện lắng nghe click bên ngoài
        const handleClickOutside = (event) => {
            if (
                avatarRef.current && !avatarRef.current.contains(event.target) &&
                dropdownRef.current && !dropdownRef.current.contains(event.target)
            ) {
                setShowDropdown(false); // Ẩn dropdown khi click ngoài
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
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
        setShowDropdown(false); // Ẩn dropdown khi đăng xuất
    };

    const handleProfileClick = () => {
        setShowDropdown(false); // Ẩn dropdown khi nhấn vào thông tin cá nhân
    };

    const toggleMenu = () => setShowMenu(!showMenu);

    return (
        <div className="relative">
            {userId && (
                <div className="absolute top-2 right-14 md:hidden z-10">
                    <img
                        ref={avatarRef} // Gắn ref vào avatar
                        src={avatar || 'https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg'}
                        alt="Avatar"
                        className="h-10 w-10 rounded-full cursor-pointer"
                        onClick={() => setShowDropdown(!showDropdown)}
                    />
                    {showDropdown && (
                        <div
                            ref={dropdownRef} // Gắn ref vào dropdown menu
                            className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md z-20"
                        >
                            <Link
                                to="/profile"
                                onClick={handleProfileClick} // Ẩn dropdown khi nhấn vào thông tin cá nhân
                                className="block px-4 py-2 text-gray-700 hover:bg-gray-200 flex items-center"
                            >
                                <span className="material-icons mr-2">person</span>
                                Thông tin cá nhân
                            </Link>
                            <button
                                onClick={handleLogout} // Ẩn dropdown khi đăng xuất
                                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200 flex items-center"
                            >
                                <span className="material-icons mr-2">logout</span>
                                Đăng xuất
                            </button>
                        </div>
                    )}
                </div>
            )}

            <div className="flex flex-col md:flex-row items-center justify-between p-4 bg-gray-100" style={{ backgroundImage: 'url(https://quatangcaominh.com/wp-content/uploads/2023/12/y-nghia-nam-con-rong-1.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="flex items-center mb-4 md:mb-0 w-full md:w-auto justify-between">
                    <img src="https://lienquanshop.vn/Data/upload/images/Adv/logo.png" alt="Logo" className="h-12" />
                    <button className="md:hidden text-gray-600 focus:outline-none z-10" onClick={toggleMenu}>
                        <span className="material-icons">menu</span>
                    </button>
                </div>

                <div className={`flex-col md:flex md:flex-row md:items-center md:space-x-4 ${showMenu ? 'flex' : 'hidden'}`}>
                    <Link to="/" className="px-4 py-2 bg-blue-500 text-center text-white rounded hover:bg-blue-700 flex items-center">
                        <span className="material-icons mr-2">home</span>
                        TRANG CHỦ
                    </Link>
                    <Link to="/favorites" className="px-4 py-2 bg-blue-500 text-center text-white rounded hover:bg-blue-700 flex items-center">
                        <span className="material-icons mr-2">favorite</span>
                        ACC YÊU THÍCH CỦA BẠN
                    </Link>
                    <Link to="/search" className="px-4 py-2 bg-blue-500 text-center text-white rounded hover:bg-blue-700 flex items-center">
                        <span className="material-icons mr-2">search</span>
                        TÌM KIẾM ACC
                    </Link>
                    <Link to="/history" className="px-4 py-2 bg-blue-500 text-center text-white rounded hover:bg-blue-700 flex items-center">
                        <span className="material-icons mr-2">history</span>
                        LỊCH SỬ MUA
                    </Link>
                    <Link to="/recharge" className="px-4 py-2 bg-blue-500 text-center text-white rounded hover:bg-blue-700 flex items-center">
                        <span className="material-icons mr-2">account_balance_wallet</span>
                        NẠP XU
                    </Link>
                </div>

                <div className="mt-4 md:mt-0 w-36 hidden md:block">
                    {userId ? (
                        <div className="relative">
                            <img
                                ref={avatarRef} // Gắn ref vào avatar
                                src={avatar || 'https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg'}
                                alt="Avatar"
                                className="h-14 w-14 rounded-full cursor-pointer"
                                onClick={() => setShowDropdown(!showDropdown)}
                            />
                            {showDropdown && (
                                <div
                                    ref={dropdownRef} // Gắn ref vào dropdown menu
                                    className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md"
                                >
                                    <Link
                                        to="/profile"
                                        onClick={handleProfileClick} // Ẩn dropdown khi nhấn vào thông tin cá nhân
                                        className="block px-4 py-2 text-gray-700 hover:bg-gray-200 flex items-center"
                                    >
                                        <span className="material-icons mr-2">person</span>
                                        Thông tin cá nhân
                                    </Link>
                                    <button
                                        onClick={handleLogout} // Ẩn dropdown khi đăng xuất
                                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200 flex items-center"
                                    >
                                        <span className="material-icons mr-2">logout</span>
                                        Đăng xuất
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <button
                            onClick={handleLoginClick}
                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 flex items-center"
                        >
                            <span className="material-icons mr-2">login</span>
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
