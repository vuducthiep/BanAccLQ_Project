import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ThanhToan = () => {
    const { accId } = useParams();
    const [accGame, setAccGame] = useState(null);
    const [notification, setNotification] = useState("");
    const [errorNotification, setErrorNotification] = useState("");
    const [modalData, setModalData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false); // Trạng thái xác nhận
    const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false); // Trạng thái thanh toán thành công
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:8080/api/accgame/${accId}`)
            .then((response) => response.json())
            .then((data) => setAccGame(data))
            .catch((error) => {
                console.error("Error fetching data:", error);
                setErrorNotification("Không thể tải thông tin tài khoản.");
                setTimeout(() => setErrorNotification(""), 3000);
            });
    }, [accId]);

    const handlePayment = () => {
        setIsConfirming(true); // Hiển thị modal xác nhận thanh toán
    };

    const confirmPayment = () => {
        fetch("http://localhost:8080/api/buy", {
            method: "POST",
            body: JSON.stringify({
                userId: localStorage.getItem('userId'),
                accGameId: accGame.id
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data.errorMessage) {
                    setErrorNotification(data.errorMessage);
                    setTimeout(() => setErrorNotification(""), 3000);
                } else {
                    setModalData(data);
                    setIsPaymentSuccessful(true); // Đánh dấu thanh toán thành công
                    setIsModalOpen(true);
                    setNotification("Thanh toán thành công!");
                    setTimeout(() => setNotification(""), 3000);
                }
                setIsConfirming(false); // Đóng modal xác nhận
            })
            .catch(error => {
                console.error("Error during payment:", error);
                setErrorNotification("Thanh toán không thành công, vui lòng thử lại!");
                setTimeout(() => setErrorNotification(""), 3000);
                setIsConfirming(false);
            });
    };

    const closeModal = () => {
        setIsModalOpen(false);
        navigate("/"); // Quay lại trang chủ hoặc danh sách tài khoản
    };

    if (!accGame) {
        return <div>Đang tải dữ liệu...</div>;
    }

    return (
        <div className="bg-slate-300">
            {/* Hiển thị thông báo phía trên bên phải */}
            {notification && (
                <div
                    className="fixed top-0 right-0 p-4 bg-green-500 text-white rounded-lg shadow-lg"
                    style={{ zIndex: 9999 }}
                >
                    {notification}
                </div>
            )}
            {errorNotification && (
                <div
                    className="fixed top-0 right-0 p-4 bg-red-500 text-white rounded-lg shadow-lg"
                    style={{ zIndex: 9999 }}
                >
                    {errorNotification}
                </div>
            )}

            <h2 className="text-2xl text-red-600 text-center font-bold mb-4">
                THÔNG TIN TÀI KHOẢN LIÊN QUÂN
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
                <div className="border bg-slate-300 p-4 rounded shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl">
                    <div className="text-center font-bold text-red-500">
                        #{accGame.id}
                    </div>
                    <img
                        src={accGame.hinhAnhDaiDien}
                        alt={accGame.tenAcc}
                        className="mb-4 rounded-3xl mx-auto hover:opacity-90 transition-opacity"
                    />
                    <h3 className="text-lg font-bold text-center mb-2">{accGame.tenAcc}</h3>
                </div>

                <div className="border bg-slate-300 p-4 rounded shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl">
                    <h3 className="font-bold text-center mb-4 text-red-600">Thông tin chi tiết</h3>
                    <div className="grid grid-cols-2 gap-4 mb-4 text-left">
                        <p><strong>Rank:</strong> {accGame.rankAcc}</p>
                        <p><strong>Tướng:</strong> {accGame.soLuongTuong}</p>
                        <p><strong>Trang phục:</strong> {accGame.soLuongTrangPhuc}</p>
                        <p><strong>Trang phục SS:</strong> {accGame.soLuongTrangPhucSS}</p>
                        <p><strong>Trang phục SSS:</strong> {accGame.soLuongTrangPhucSSS}</p>
                        <p className="text-red-400"><strong>Giá:</strong>{accGame.gia ? accGame.gia.toLocaleString("vi-VN", { style: "currency", currency: "VND" }) : "Chưa có giá"}</p>
                        <p><strong>Mô tả:</strong> {accGame.moTa}</p>
                        <p><strong>Cấp độ:</strong> {accGame.level}</p>
                        <p><strong>Loại tài khoản:</strong> {accGame.loaiAccGame.tenLoai}</p>
                    </div>
                    <div className="flex justify-center">
                        <button
                            className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
                            onClick={handlePayment} // Khi nhấn nút này, thực hiện thanh toán
                        >
                            Thanh toán
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal xác nhận thanh toán */}
            {isConfirming && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                        <h3 className="text-xl font-bold text-center mb-4">Xác nhận thanh toán</h3>
                        <p className="mb-4 text-center">Bạn có chắc chắn muốn mua tài khoản này?</p>
                        <div className="flex justify-around mt-4 space-x-4">
                            <button
                                className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 w-full"
                                onClick={confirmPayment}
                            >
                                Xác nhận
                            </button>
                            <button
                                className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 w-full"
                                onClick={() => setIsConfirming(false)}
                            >
                                Hủy
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal hiển thị thông tin tài khoản vừa mua */}
            {isModalOpen && modalData && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                        <h3 className="text-xl font-bold text-center text-green-500 mb-4">Thông Tin Tài Khoản Mua</h3>
                        <p><strong>ID:</strong> {modalData.id}</p>
                        <p><strong>Tài Khoản:</strong> {modalData.taiKhoan}</p>
                        <p><strong>Mật Khẩu:</strong> {modalData.matKhau}</p>
                        <p><strong>Giá:</strong> {modalData.gia.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</p>
                        <p className="text-red-500 mt-4">Hãy đổi mật khẩu tài khoản sau khi giao dịch.</p>
                        <button
                            className="mt-4 bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600"
                            onClick={closeModal}  // Đóng modal và quay lại trang chủ
                        >
                            Đóng
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ThanhToan;
