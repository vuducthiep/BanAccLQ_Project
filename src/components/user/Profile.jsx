import React, { useState, useEffect } from "react";

const Profile = () => {
    const [userDetails, setUserDetails] = useState(null);
    const [notification, setNotification] = useState(""); // State để lưu thông báo
    const [loading, setLoading] = useState(true); // State để kiểm tra trạng thái loading
    const [isModalOpen, setIsModalOpen] = useState(false); // State để kiểm tra trạng thái mở modal
    const [updatedUserDetails, setUpdatedUserDetails] = useState({
        id: localStorage.getItem("userId"),
        ten: "",
        soDienThoai: "",
        matKhau: "",
    });

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
        // Mở modal khi nhấn cập nhật
        setUpdatedUserDetails({
            ten: userDetails.ten,
            soDienThoai: userDetails.soDienThoai, // Sao chép thông tin cũ vào updatedUserDetails
            matKhau: "", // Để trống mật khẩu vì người dùng có thể muốn cập nhật nó
        });
        setIsModalOpen(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedUserDetails({
            ...updatedUserDetails,
            [name]: value,
        });
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSaveUpdate = () => {
        const userId = localStorage.getItem("userId");
    
        // Kiểm tra ID và thông tin cập nhật
        if (!updatedUserDetails.ten || !updatedUserDetails.soDienThoai) {
            setNotification("Tên và số điện thoại là bắt buộc!");
            setTimeout(() => setNotification(""), 3000);
            return;
        }
    
        const updatedDetails = {
            id: userId,
            ten: updatedUserDetails.ten,
            soDienThoai: updatedUserDetails.soDienThoai,
            matKhau: updatedUserDetails.matKhau,
        };
    
        console.log(updatedDetails);  // Log the payload to verify the structure
    
        fetch(`http://localhost:8080/api/nguoidung/update`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedDetails),
        })
        .then((response) => response.json()) // Chắc chắn rằng response được phân tích đúng thành JSON
        .then((data) => {
            if (data.message) {
                // Kiểm tra nếu backend trả về thông báo dưới dạng JSON với trường 'message'
                if (data.message.includes("Cập nhật thất bại, vui lòng thử lại sau.")) {
                    setNotification("Số điện thoại bị trùng hoặc không đúng định dạng.");
                    setTimeout(() => setNotification(""), 3000);
                } else {
                    setNotification("Thông tin đã được cập nhật!");
                    setTimeout(() => setNotification(""), 3000);
    
                    // Sau khi cập nhật thành công, gọi lại API để lấy lại thông tin người dùng
                    const userId = localStorage.getItem("userId");
                    fetch(`http://localhost:8080/api/nguoidung/${userId}`)
                        .then((response) => response.json())
                        .then((data) => {
                            setUserDetails(data); // Cập nhật lại thông tin người dùng
                        })
                        .catch((error) => {
                            console.error("Error fetching updated user details:", error);
                            setNotification("Đã có lỗi xảy ra khi tải lại thông tin người dùng!");
                            setTimeout(() => setNotification(""), 3000);
                        });
                }
            } else {
                setNotification("Đã có lỗi xảy ra khi cập nhật thông tin!");
                setTimeout(() => setNotification(""), 3000);
            }
            setIsModalOpen(false); // Close modal after update
        })
        .catch((error) => {
            console.error("Error updating user details:", error);
            setNotification("Đã có lỗi xảy ra khi cập nhật thông tin!");
            setTimeout(() => setNotification(""), 3000);
        });
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
                        src={userDetails.anhDaiDien || 'https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg'} 
                        alt={userDetails.ten} 
                        className="w-full h-auto max-w-xs rounded-lg shadow-lg" 
                    />
                </div>

                {/* Thông tin cá nhân */}
                <div className="col-span-2 space-y-4">
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
                        <span className="font-semibold">Số tiền: {userDetails.soTien ? userDetails.soTien.toLocaleString("vi-VN", { style: "currency", currency: "VND" }) : "Chưa có số tiền"}</span>
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

            {/* Modal cập nhật thông tin */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 z-10 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h3 className="text-xl font-semibold mb-4">Cập nhật thông tin cá nhân</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block font-medium">Tên</label>
                                <input 
                                    type="text" 
                                    name="ten"
                                    value={updatedUserDetails.ten}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded-md"
                                />
                            </div>

                            <div>
                                <label className="block font-medium">Số điện thoại</label>
                                <input 
                                    type="text" 
                                    name="soDienThoai"
                                    value={updatedUserDetails.soDienThoai}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded-md"
                                />
                            </div>

                            <div>
                                <label className="block font-medium">Mật khẩu</label>
                                <input 
                                    type="password" 
                                    name="matKhau"
                                    value={updatedUserDetails.matKhau}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded-md"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end mt-4">
                            <button 
                                onClick={handleCloseModal} 
                                className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
                            >
                                Hủy
                            </button>
                            <button 
                                onClick={handleSaveUpdate} 
                                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                            >
                                Xác nhận cập nhật
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
