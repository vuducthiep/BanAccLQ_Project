import React, { useState, useEffect } from "react";

const Profile = () => {
    const [userDetails, setUserDetails] = useState(null);
    const [notification, setNotification] = useState(""); // State để lưu thông báo
    const [loading, setLoading] = useState(true); // State để kiểm tra trạng thái loading

    useEffect(() => {
        // Lấy userId từ localStorage
        const userId = localStorage.getItem("userId");

        if (userId) {
            // Fetch dữ liệu người dùng từ API
            fetch(`http://localhost:8080/api/nguoidung/${userId}`)
                .then((response) => response.json())
                .then((data) => {
                    setUserDetails(data);
                    setLoading(false); // Dữ liệu đã được load, tắt loading
                })
                .catch((error) => {
                    console.error("Error fetching user details:", error);
                    setNotification("Đã có lỗi xảy ra khi tải thông tin!");
                    setTimeout(() => setNotification(""), 3000);
                    setLoading(false);
                });
        } else {
            setNotification("Không tìm thấy thông tin người dùng trong localStorage.");
            setTimeout(() => setNotification(""), 3000);
            setLoading(false);
        }
    }, []);

    const handleUpdateClick = () => {
        // Thêm logic xử lý khi người dùng muốn cập nhật thông tin cá nhân
        setNotification("Thông tin đã được cập nhật!");
        setTimeout(() => setNotification(""), 3000);
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!userDetails) {
        return <p>Không tìm thấy thông tin người dùng.</p>;
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl text-center text-red-600 font-bold mb-6">Thông tin cá nhân</h2>

            {/* Hiển thị thông báo */}
            {notification && (
                <div className="fixed top-0 right-0 p-4 bg-green-500 text-white rounded-lg shadow-lg">
                    {notification}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 p-4 gap-6 bg-slate-200">
                {/* Ảnh đại diện */}
                <div className="flex justify-center items-center">
                    <img 
                        src={userDetails.anhDaiDien} 
                        alt={userDetails.ten} 
                        className="w-full h-auto max-w-xs rounded-lg shadow-lg" 
                    />
                </div>

                {/* Thông tin cá nhân */}
                <div className="col-span-2 space-y-4 ">
                    <div className="flex">
                        <span className="font-semibold">Tên: {userDetails.ten}</span>
                    </div>

                    <div className="flex">
                        <span className="font-semibold">Tên tài khoản: {userDetails.taiKhoan}</span>
                    </div>

                    <div className="flex">
                        <span className="font-semibold">Số điện thoại: {userDetails.soDienThoai}</span>
                    </div>

                    <div className="flex">
                        <span className="font-semibold">Số tiền: {userDetails.soTien.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</span>
                    </div>

                    <div className="flex">
                        <span className="font-semibold">Số tiền đã sử dụng: {userDetails.soTienDaSuDung.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</span>
                    </div>

                    <div className="flex">
                        <span className="font-semibold">Ngày tạo tài khoản: {new Date(userDetails.createAt).toLocaleDateString()}</span>
                    </div>

                    <div className="flex">
                        <span className="font-semibold">Quyền: {userDetails.admin ? "Admin" : "Người dùng"}</span>
                    </div>
                </div>
            </div>

            {/* Nút cập nhật */}
            <div className="flex justify-center mt-6">
                <button 
                    className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition-colors"
                    onClick={handleUpdateClick}
                >
                    Cập nhật thông tin
                </button>
            </div>
        </div>
    );
};

export default Profile;
