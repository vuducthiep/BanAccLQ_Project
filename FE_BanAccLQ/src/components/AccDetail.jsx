import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const AccDetail = () => {
    const { id } = useParams();
    const [accDetails, setAccDetails] = useState(null);

    useEffect(() => {
        // Thay URL bằng endpoint API thực tế của bạn
        fetch(`http://localhost:8080/api/accgame/${id}`)
            .then((response) => response.json())
            .then((data) => setAccDetails(data))
            .catch((error) => console.error("Error fetching details:", error));
    }, [id]);

    if (!accDetails) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h2 className="text-2xl text-red-600 text-center font-bold mb-4">
                Chi tiết tài khoản #{id}
            </h2>
            {/* Hiển thị chi tiết tài khoản */}
            <div>
                <img src={accDetails.hinhAnhDaiDien} alt={accDetails.tenAcc} />
                <h3>{accDetails.tenAcc}</h3>
                <p>Rank: {accDetails.rankAcc}</p>
                <p>Tướng: {accDetails.soLuongTuong}</p>
                <p>Trang phục: {accDetails.soLuongTrangPhuc}</p>
                <p>Giá: {accDetails.gia.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                })}</p>
            </div>
        </div>
    );
};

export default AccDetail;
