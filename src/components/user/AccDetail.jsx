import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const AccDetail = () => {
    const { id } = useParams();
    const [accDetails, setAccDetails] = useState(null);
    const [notification, setNotification] = useState("");
    const [comments, setComments] = useState([]);
    const [loadingComments, setLoadingComments] = useState(true);
    const [newComment, setNewComment] = useState("");
    const [anhAccList, setAnhAccList] = useState([]); // Thêm state cho danh sách ảnh

    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
        fetch(`http://localhost:8080/api/accgame/acc-detail/${id}`)
            .then((response) => response.json())
            .then((data) => setAccDetails(data))
            .catch((error) => console.error("Error fetching details:", error));
        
        fetch(`http://localhost:8080/api/accgame/${id}/images`)
            .then((response) => response.json())
            .then((data) => setAnhAccList(data))
            .catch((error) => console.error("Error fetching images:", error));

        fetch(`http://localhost:8080/api/binhluan/accgame/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setComments(data);
                setLoadingComments(false);
            })
            .catch((error) => {
                console.error("Error fetching comments:", error);
                setLoadingComments(false);
            });
    }, [id]);

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

    const handleBuyNow = () => {
        const idNguoiDung = localStorage.getItem('userId');
        if (!idNguoiDung) {
            setNotification("Vui lòng đăng nhập để mua tài khoản!");
            setTimeout(() => setNotification(""), 3000);
            return;
        }
        navigate(`/thanhtoan/${id}`);
    };

    if (!accDetails) {
        return <p>Loading...</p>;
    }

    const handleAddComment = () => {
        const idNguoiDung = localStorage.getItem('userId');
        if (!idNguoiDung) {
            setNotification("Vui lòng đăng nhập để bình luận!");
            setTimeout(() => setNotification(""), 3000);
            return;
        }

        if (!newComment.trim()) {
            setNotification("Vui lòng nhập nội dung bình luận!");
            setTimeout(() => setNotification(""), 3000);
            return;
        }
        
        fetch("http://localhost:8080/api/binhluan/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                idAccGame: id,
                idNguoiDung: idNguoiDung,
                noiDung: newComment,
            }),
        })
            .then((response) => response.text())
            .then((data) => {
                if (data === "success") {
                    setNewComment("");
                    fetchComments();
                    setNotification("Đã thêm bình luận");
                    setTimeout(() => setNotification(""), 3000);
                } else {
                    setNotification("Đã có lỗi xảy ra, vui lòng thử lại!");
                    setTimeout(() => setNotification(""), 3000);
                }
            })
            .catch((error) => {
                setNotification("Đã có lỗi xảy ra, vui lòng thử lại!");
                setTimeout(() => setNotification(""), 3000);
            });
    };
    
    const fetchComments = () => {
        setLoadingComments(true);
    
        fetch(`http://localhost:8080/api/binhluan/accgame/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setComments(data);
                setLoadingComments(false);
            })
            .catch((error) => {
                console.error("Error fetching comments:", error);
                setLoadingComments(false);
            });
    };

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

            {/* Phần hiển thị ảnh chi tiết tài khoản */}
            <div className="mt-6 bg-slate-200">
                <h3 className="text-2xl text-center font-semibold mb-4">Ảnh chi tiết tài khoản</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {anhAccList.length > 0 ? (
                        anhAccList.map((anh) => (
                            <div key={anh.id} className="flex justify-center">
                                <img
                                    src={anh.urlAnh}
                                    alt={anh.moTa || "Ảnh chi tiết không có mô tả"}
                                    className="w-full h-auto transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:rounded-lg rounded-lg"
                                    style={{ width: '600px', height: '400px', objectFit: 'cover' }}
                                />
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">Chưa có ảnh chi tiết nào.</p>
                    )}
                </div>
            </div>

            {/* Button mua ngay và yêu thích */}
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

            <div className="mt-8 bg-gray-100 p-4 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold mb-4">Bình luận</h3>
                {loadingComments ? (
                    <p>Đang tải bình luận...</p>
                ) : (
                    <div>
                        {comments.length > 0 ? (
                            comments.map((comment) => (
                                <div key={comment.id} className="mb-4 p-4 border-b border-gray-300">
                                    <div className="flex items-start">
                                        <img 
                                            src={comment.anhDaiDien || 'https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg'} 
                                            alt={comment.ten} 
                                            className="w-12 h-12 rounded-full mr-4" 
                                        />
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-lg">
                                                {comment.ten} {comment.admin && <span className="text-blue-500">(Admin)</span>}
                                            </span>
                                            <span className="text-sm text-gray-500">
                                                {new Date(comment.ngayBinhLuan).toLocaleString()}
                                            </span>
                                            <p className="mt-2">{comment.noiDung}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>Chưa có bình luận nào.</p>
                        )}
                    </div>
                )}

                <div className="mt-6">
                    <textarea 
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        rows="4"
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        placeholder="Viết bình luận của bạn..."
                    />
                    <button 
                        onClick={handleAddComment}
                        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
                    >
                        Thêm bình luận
                    </button>
                </div>

            </div>
        </div>
    );
};

export default AccDetail;
