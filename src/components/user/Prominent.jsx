import React, { useEffect, useState } from "react";

const Prominent = () => {
  const [list1, setList1] = useState([]);
  const [list2, setList2] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/nguoidung/top-nguoi-dung")
      .then((response) => response.json())
      .then((data) => setList1(data))
      .catch((error) => console.error("Error fetching list1:", error));

    fetch("http://localhost:8080/api/accgame/topAccGame")
      .then((response) => response.json())
      .then((data) => setList2(data))
      .catch((error) => console.error("Error fetching list2:", error));
  }, []);

  return (
    <div className="flex flex-col md:flex-row p-6">
      {/* Danh sách 1 */}
      <div className="w-full md:w-1/2 md:pr-4 mb-6 md:mb-0">
        <h2 className="text-2xl text-red-600 text-center font-bold mb-4">TOP KHÁCH HÀNG CHI TIÊU NHIỀU NHẤT</h2>
        <table className="min-w-full bg-slate-600 font-bold shadow-lg rounded-lg border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2 font-bold text-center">STT</th>
              <th className="border px-4 py-2 font-bold text-center">TÊN NGƯỜI DÙNG</th>
              <th className="border px-4 py-2 font-bold text-center">SỐ XU ĐÃ SỬ DỤNG</th>
            </tr>
          </thead>
          <tbody>
            {list1.map((item, index) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2 font-bold text-center">{index + 1}</td>
                <td className="border px-4 py-2 text-center font-bold text-red-400">{item.ten}</td>
                <td className="border px-4 py-2 font-bold text-yellow-400 text-center">
                  {item.soTienDaSuDung.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Danh sách 2 */}
      <div className="w-full md:w-1/2 md:pl-4">
        <h2 className="text-2xl text-red-600 text-center font-bold mb-4">TOP ACC ĐƯỢC YÊU THÍCH NHIỀU NHẤT</h2>
        <table className="min-w-full bg-slate-600 font-bold shadow-lg rounded-lg border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2 font-bold text-center">ID</th>
              <th className="border px-4 py-2 font-bold text-center">GIÁ</th>
              <th className="border px-4 py-2 font-bold text-center">LƯỢT YÊU THÍCH</th>
            </tr>
          </thead>
          <tbody>
            {list2.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2 font-bold text-center">#{item.id}</td>
                <td className="border px-4 text-center font-bold text-red-500 py-2">{item.gia.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}</td>
                <td className="border px-4 font-bold text-green-500 py-2 text-center">{item.soLuongYeuThich}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Prominent;
