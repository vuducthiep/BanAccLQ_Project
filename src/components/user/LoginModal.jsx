import React, { useState } from 'react';

function LoginModal({ onClose }) {
    const [activeTab, setActiveTab] = useState('register');
    const [formData, setFormData] = useState({
        taiKhoan: '',
        matKhau: '',
        ten: '',
        soDienThoai: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Handle input changee
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    // Function to handle registration
    const handleRegister = async () => {
        const payload = {
            ten: formData.ten,
            taiKhoan: formData.taiKhoan,
            matKhau: formData.matKhau,
            soDienThoai: formData.soDienThoai
        };

        try {
            const response = await fetch('http://localhost:8080/api/nguoidung/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
        
            const data = await response.json();
        
            // Kiểm tra nếu phản hồi là thành công và có token
            if (response.ok) {
                // Lưu token và id vào localStorage
                localStorage.setItem('token', data.token);
                localStorage.setItem('userId', data.id);
        

                alert('Đăng ký thành công!');
                location.reload();
            } else {
                // Nếu không có token, hiển thị lỗi từ backend
                setError(data || 'Đã xảy ra lỗi. Vui lòng thử lại.');
            }
        } catch (error) {
            setError('Lỗi kết nối với máy chủ. Vui lòng thử lại.');
        }
        
    };

    // Function to handle login
    const handleLogin = async () => {
        const payload = {
            taiKhoan: formData.taiKhoan,
            matKhau: formData.matKhau
        };

        try {
            setLoading(true);
            const response = await fetch('http://localhost:8080/api/nguoidung/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (response.ok) {
                // Lưu token và id vào localStorage sau khi đăng nhập thành công
                localStorage.setItem('token', data.token); // Giả sử API trả về token
                localStorage.setItem('userId', data.id);   // Giả sử API trả về id người dùng

                alert('Đăng nhập thành công!');
                location.reload();
            } else {
                setError(data.message || 'Đã xảy ra lỗi. Vui lòng thử lại.');
            }
        } catch (error) {
            setError('Lỗi kết nối với máy chủ. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (activeTab === 'register') {
            handleRegister();
        } else {
            handleLogin();
        }
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setError(''); // Reset error when switching tabs
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* Modal content */}
            <div className="bg-slate-400 rounded-lg w-full max-w-lg p-6 relative z-50">
                {/* Modal Header */}
                <div className="modal-header flex justify-between items-center">
                    <h5 className="modal-title text-2xl font-bold">TÀI KHOẢN</h5>
                    <button
                        type="button"
                        className="text-gray-500 hover:text-gray-700"
                        aria-label="Close"
                        onClick={onClose}
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                {/* Modal Body */}
                <div className="modal-body mt-4">
                    {/* Tab Navigation */}
                    <div className="tab tab-user mb-4">
                        <ul className="flex border-b">
                            <li className="mr-4">
                                <button
                                    onClick={() => handleTabChange('login')}
                                    className={`pb-2 ${activeTab === 'login' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
                                >
                                    Đăng nhập
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => handleTabChange('register')}
                                    className={`pb-2 ${activeTab === 'register' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
                                >
                                    Đăng ký
                                </button>
                            </li>
                        </ul>
                    </div>

                    {/* Error message */}
                    {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

                    {/* Register Tab */}
                    {activeTab === 'register' && (
                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-4">
                                <input
                                    type="text"
                                    name="ten"
                                    value={formData.ten}
                                    onChange={handleInputChange}
                                    className="form-control border p-2 rounded"
                                    placeholder="Nhập tên"
                                />
                                <input
                                    type="text"
                                    name="taiKhoan"
                                    value={formData.taiKhoan}
                                    onChange={handleInputChange}
                                    className="form-control border p-2 rounded"
                                    placeholder="Nhập tài khoản"
                                />
                                <input
                                    type="password"
                                    name="matKhau"
                                    value={formData.matKhau}
                                    onChange={handleInputChange}
                                    className="form-control border p-2 rounded"
                                    placeholder="Nhập mật khẩu"
                                />
                                <input
                                    type="text"
                                    name="soDienThoai"
                                    value={formData.soDienThoai}
                                    onChange={handleInputChange}
                                    className="form-control border p-2 rounded"
                                    placeholder="Nhập số điện thoại"
                                />
                                <button
                                    type="submit"
                                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                                    disabled={loading}
                                >
                                    {loading ? 'Đang đăng ký...' : 'Đăng ký'}
                                </button>
                            </div>
                        </form>
                    )}

                    {/* Login Tab */}
                    {activeTab === 'login' && (
                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-4">
                                <input
                                    type="text"
                                    name="taiKhoan"
                                    value={formData.taiKhoan}
                                    onChange={handleInputChange}
                                    className="form-control border p-2 rounded"
                                    placeholder="Nhập tài khoản"
                                />
                                <input
                                    type="password"
                                    name="matKhau"
                                    value={formData.matKhau}
                                    onChange={handleInputChange}
                                    className="form-control border p-2 rounded"
                                    placeholder="Nhập mật khẩu"
                                />
                                <button
                                    type="submit"
                                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                                    disabled={loading}
                                >
                                    {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>

            {/* Overlay to close modal when clicked */}
            <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={onClose}></div>
        </div>
    );
}

export default LoginModal;
