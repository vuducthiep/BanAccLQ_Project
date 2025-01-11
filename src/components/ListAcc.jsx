import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ListAcc = () => {
    const [accGames, setAccGames] = useState([]);
    const [notification, setNotification] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:8080/api/accgame/getAllAcc")
            .then((response) => response.json())
            .then((data) => setAccGames(data))
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    const handleAccClick = (id) => {
        navigate(`/acc/${id}`);
    };

    const handleFavoriteClick = (accId) => {
        const idNguoiDung = localStorage.getItem('userId');
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

    const handleBuyClick = (accId, e) => {
        e.stopPropagation();
        navigate(`/thanhtoan/${accId}`);
    };

    return (
        <div>
            {notification && (
                <div
                    className="fixed top-0 right-0 p-4 bg-green-500 text-white rounded-lg shadow-lg"
                    style={{
                        zIndex: 9999,
                    }}
                >
                    {notification}
                </div>
            )}
            <h2 className="text-2xl bg-amber-200 text-red-600 text-center font-bold mb-4">
                DANH SÁCH TÀI KHOẢN LIÊN QUÂN
            </h2>
            <div className="grid bg-emerald-50 grid-cols-1 gap-4 p-4 sm:grid-cols-1 md:grid-cols-4">

                {accGames.map((acc) => (
                    <div
                        key={acc.id}
                        className="border bg-slate-300 p-4 rounded shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl hover:bg-slate-200"
                        onClick={() => handleAccClick(acc.id)}
                    >
                        <div className="text-center font-bold text-red-500">
                            #{acc.id}
                        </div>
                        <img
                            src={acc.hinhAnhDaiDien}
                            alt={acc.tenAcc}
                            className="w-full h-auto mb-4 rounded hover:opacity-90 transition-opacity"
                        />
                        <h3 className="text-lg font-bold text-center mb-2">{acc.tenAcc}</h3>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <p><strong>Rank:</strong> {acc.rankAcc}</p>
                            <p><strong>Tướng:</strong> {acc.soLuongTuong}</p>
                            <p><strong>Trang phục:</strong> {acc.soLuongTrangPhuc}</p>
                            <p className="text-red-400"><strong>Giá:</strong> {acc.gia.toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND",
                            })}</p>
                        </div>
                        <div className="flex justify-between">
                            <button 
                                className="bg-blue-500 text-white px-4 py-2 rounded flex items-center hover:bg-blue-600 transition-colors transform hover:scale-105"
                                onClick={(e) => handleBuyClick(acc.id, e)}
                            >
                                <span className="material-icons mr-2">shopping_cart</span>
                                Mua ngay
                            </button>
                            <button 
                                className="bg-red-500 text-white px-4 py-2 rounded flex items-center hover:bg-red-600 transition-colors transform hover:scale-105"
                                onClick={(e) => handleFavoriteClickWithStopPropagation(acc.id, e)}
                            >
                                <span className="material-icons mr-2">favorite</span>
                                Yêu thích
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListAcc;
