import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";  // Import useNavigate

const AccDetail = () => {
    const { id } = useParams();
    const [accDetails, setAccDetails] = useState(null);
    const [notification, setNotification] = useState("");
    const navigate = useNavigate();  // Khai báo useNavigate

    useEffect(() => {
        window.scrollTo(0, 0);
        fetch(`http://localhost:8080/api/accgame/${id}`)
            .then((response) => response.json())
            .then((data) => setAccDetails(data))
            .catch((error) => console.error("Error fetching details:", error));
    }, [id]);

    const handleFavoriteClick = (accId) => {
        const idNguoiDung = localStorage.getItem('userId'); // Lấy id người dùng

        fetch("http://localhost:8080/api/yeuthich", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                idNguoiDung: idNguoiDung,
                idAccGame: accId,
            }),
        })
            .then((response) => response.text())
            .then((data) => {
                if (data.includes("Tài khoản game đã được thêm vào danh sách yêu thích")) {
                    setNotification("Đã thêm vào danh sách yêu thích!");
                    setTimeout(() => setNotification(""), 3000);
                } else {
                    setNotification("Tài khoản này đã được bạn cho vào danh sách yêu thích trước đó");
                    setTimeout(() => setNotification(""), 3000);
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                setNotification("Đã có lỗi xảy ra, vui lòng thử lại!");
                setTimeout(() => setNotification(""), 3000);
            });
    };

    const handleFavoriteClickWithStopPropagation = (accId, e) => {
        e.stopPropagation();
        handleFavoriteClick(accId);
    };

    // Điều hướng đến trang thanh toán khi nhấn "Mua ngay"
    const handleBuyNow = () => {
        navigate(`/thanhtoan/${id}`);  // Điều hướng đến trang thanh toán với id tài khoản game
    };

    if (!accDetails) {
        return <p>Loading...</p>;
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl text-center text-red-600 font-bold mb-6">
                Chi tiết tài khoản #{id}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex justify-center items-center">
                    <img
                        src={accDetails.hinhAnhDaiDien}
                        alt={accDetails.tenAcc}
                        className="w-full h-auto max-w-xs rounded-lg shadow-lg"
                    />
                </div>

                <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div className="flex">
                            <span className="font-semibold">Tên tài khoản: </span>
                            <span>{accDetails.tenAcc}</span>
                        </div>

                        <div className="flex">
                            <span className="font-semibold">Mô tả: </span>
                            <span>{accDetails.moTa}</span>
                        </div>

                        <div className="flex">
                            <span className="font-semibold">Rank: </span>
                            <span>{accDetails.rankAcc}</span>
                        </div>

                        <div className="flex">
                            <span className="font-semibold">Số lượng tướng: </span>
                            <span>{accDetails.soLuongTuong}</span>
                        </div>

                        <div className="flex">
                            <span className="font-semibold">Số lượng trang phục: </span>
                            <span>{accDetails.soLuongTrangPhuc}</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex">
                            <span className="font-semibold">Level: </span>
                            <span>{accDetails.level}</span>
                        </div>

                        <div className="flex">
                            <span className="font-semibold">Trang phục SS: </span>
                            <span>{accDetails.soLuongTrangPhucSS}</span>
                        </div>

                        <div className="flex">
                            <span className="font-semibold">Trang phục SSS: </span>
                            <span>{accDetails.soLuongTrangPhucSSS}</span>
                        </div>

                        <div className="flex">
                            <span className="font-semibold">Giá: </span>
                            <span className="font-bold text-green-600">
                                {accDetails.gia.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                            </span>
                        </div>

                        <div className="flex">
                            <span className="font-semibold">Loại tài khoản: </span>
                            <span>{accDetails.loaiAccGame.tenLoai}</span>
                        </div>

                        <div className="flex">
                            <span className="font-semibold">Trạng thái: </span>
                            <span>{accDetails.trangThai === 'chuaBan' ? 'Chưa bán' : 'Đã bán'}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 bg-slate-200">
                <h3 className="text-2xl text-center font-semibold mb-4">Ảnh chi tiết tài khoản</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {accDetails.anhAccList && accDetails.anhAccList.map((anh) => (
                        <div key={anh.id} className="flex justify-center">
                            <img
                                src={anh.urlAnh}
                                alt={anh.moTa || "Ảnh chi tiết"}
                                className="w-full h-auto transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:rounded-lg rounded-lg"
                                style={{ width: '600px', height: '400px', objectFit: 'cover' }}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-center gap-4 mt-6">
                <button 
                    className="bg-blue-500 text-white px-4 py-2 rounded flex items-center hover:bg-blue-600 transition-colors"
                    onClick={handleBuyNow}   
                >
                    <span className="material-icons mr-2">shopping_cart</span>
                    Mua ngay
                </button>
                <button
                    className="bg-red-500 text-white px-4 py-2 rounded flex items-center hover:bg-red-600 transition-colors"
                    onClick={(e) => handleFavoriteClickWithStopPropagation(accDetails.id, e)}
                >
                    <span className="material-icons mr-2">favorite</span>
                    Yêu thích
                </button>
            </div>

            {notification && (
                <div className="fixed top-0 right-0 p-4 bg-green-500 text-white rounded-lg shadow-lg">
                    {notification}
                </div>
            )}
        </div>
    );
};

export default AccDetail;
