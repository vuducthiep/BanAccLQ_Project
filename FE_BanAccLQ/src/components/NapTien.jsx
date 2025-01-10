import React, { useState } from "react";

const NapTien = () => {
  const [amount, setAmount] = useState(""); // Số tiền nhập vào
  const [qrCodeImage, setQrCodeImage] = useState(""); // Hình ảnh QR

  // Xử lý khi người dùng nhập số tiền
  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  // Xử lý khi người dùng nhấn nút "Nạp Tiền"
  const handleSubmit = (e) => {
    e.preventDefault();
    if (parseFloat(amount) > 0) {
      generateQRCode(amount); // Tạo mã QR khi có số tiền hợp lệ
    } else {
      alert("Vui lòng nhập số tiền hợp lệ.");
    }
  };

  // Hàm tạo mã QR
  const generateQRCode = (amount) => {
    const qrUrl = `https://img.vietqr.io/image/MB-0852688994-compact2.png?amount=${amount}&addInfo=Nạp%20tiền%20web%20LienQuanShop.com&accountName=Hoang%20Le%20Ngoc%20Anh`;
    setQrCodeImage(qrUrl);
  };

  // Xử lý khi nhấn nút "Xác nhận đã nạp"
  // Xử lý khi nhấn nút "Xác nhận đã nạp"
const handleConfirmPayment = () => {
    const userId = localStorage.getItem("userId");
  
    if (!userId) {
      alert("Không tìm thấy userId trong localStorage.");
      return;
    }
  
    const requestBody = {
      id: userId,
      soTien: amount,
    };
  
    fetch("http://localhost:8080/api/nguoidung/nap-tien", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.text()) // Đọc dữ liệu dưới dạng text
      .then((data) => {
        if (data === "Nạp tiền thành công") {
          alert(data); // Hiển thị thông báo nếu phản hồi là "Nạp tiền thành công"
        } else {
          alert("Có lỗi xảy ra: " + data); // Nếu có lỗi, hiển thị thông báo lỗi
        }
      })
      .catch((error) => {
        alert("Có lỗi xảy ra khi nạp tiền: " + error.message);
        console.error("There was an error:", error);
      });
  };
  

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Trang Nạp Tiền</h2>

      <form onSubmit={handleSubmit} className="mb-4">
        <label htmlFor="amount" className="block text-lg mb-2 text-gray-700">
          Nhập số tiền bạn muốn nạp:
        </label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={handleAmountChange}
          placeholder="Số tiền (VND)"
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Nạp Tiền
        </button>
      </form>

      {qrCodeImage && (
        <div className="text-center mt-6">
          <h3 className="text-xl font-semibold mb-4">Mã QR để thanh toán</h3>
          <img
            src={qrCodeImage}
            alt="QR Code"
            className="w-64 h-64 mx-auto rounded-lg shadow-lg"
          />
        </div>
      )}

      {qrCodeImage && (
        <button
          onClick={handleConfirmPayment}
          className="mt-4 w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          Xác nhận đã nạp
        </button>
      )}
    </div>
  );
};

export default NapTien;
