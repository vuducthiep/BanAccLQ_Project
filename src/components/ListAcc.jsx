import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ListAcc = () => {
    const [accGames, setAccGames] = useState([]);
    const [notification, setNotification] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();

    const fetchAccGames = async (page) => {
        try {
            const response = await fetch(`http://localhost:8080/api/accgame/listAccHomePage?page=${page - 1}&size=16`);
            const data = await response.json();

            if (Array.isArray(data)) {
                setAccGames(data);
                if (data.length === 0) {
                    // Nếu trang hiện tại không có dữ liệu, không cho phép chuyển sang trang tiếp theo
                    setTotalPages(page); // Sử dụng trang hiện tại là trang cuối cùng có dữ liệu
                } else {
                    setTotalPages(10); // Cập nhật lại tổng số trang (hoặc tính từ backend)
                }
            } else {
                console.error("Dữ liệu không đúng định dạng:", data);
                setAccGames([]);
            }
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu:", error);
            setAccGames([]);
        }
    };








    useEffect(() => {
        fetchAccGames(currentPage);
    }, [currentPage]);

    const handleAccClick = (id) => {
        navigate(`/acc/${id}`);
    };

    const handleFavoriteClick = (accId) => {
        const idNguoiDung = localStorage.getItem('userId');
        if (!idNguoiDung) {
            setNotification("Vui lòng đăng nhập để thêm vào yêu thích!");
            setTimeout(() => setNotification(""), 3000);
            return;
        }

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

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            // Đợi state cập nhật xong mới scroll
            setTimeout(() => {
                window.scrollTo({
                    top: 950,
                    left: 0, 
                    behavior: 'smooth'
                });
            }, 100);
        }
    };
    
    const handleNextPage = () => {
        if (accGames.length > 0 && currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            // Đợi state cập nhật xong mới scroll 
            setTimeout(() => {
                window.scrollTo({
                    top: 950,
                    left: 0,
                    behavior: 'smooth'
                });
            }, 100);
        }
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
                {accGames && accGames.length > 0 ? (
                    accGames.map((acc) => (
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
                    ))
                ) : (
                    <div className="col-span-4 text-center text-gray-500">
                        Không có tài khoản nào để hiển thị
                    </div>
                )}
            </div>
            <div className="flex justify-center mt-8 space-x-4">
                <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className="px-6 py-3 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition-all duration-200 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:bg-gray-300 flex items-center"
                >
                    <span className="material-icons mr-2">arrow_back</span>
                    Trang trước
                </button>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="px-6 py-3 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition-all duration-200 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:bg-gray-300 flex items-center"
                >
                    Trang sau
                    <span className="material-icons ml-2">arrow_forward</span>
                </button>
            </div>

        </div>
    );
};

export default ListAcc;
