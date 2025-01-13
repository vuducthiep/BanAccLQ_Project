import React, { useEffect } from "react";

const Footer = () => {
  useEffect(() => {
    // Facebook Messenger SDK script
    const script = document.createElement("script");
    script.src = "https://connect.facebook.net/vi_VN/sdk/xfbml.customerchat.js";
    script.async = true;
    script.onload = () => {
      window.FB.init({
        xfbml: true,
        version: "v15.0",
      });
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); // Clean up script on unmount
    };
  }, []);

  return (
    <footer
      id="footer"
      className="bg-gray-800 text-white py-8 mt-[50px]"
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Hotline Section */}
          <div>
            <p className="text-lg font-semibold">
              Hotline: <a href="tel:0326515832" className="text-blue-400">0326515832</a>
            </p>
            <p>Vũ Đức Thiệp</p>
          </div>

          <div>
            <p className="font-semibold mt-4">Thời gian làm việc:</p>
            <p><strong>GIAO DỊCH TỰ ĐỘNG 24/7</strong></p>
          </div>
          
          {/* Social Links Section */}
          <div>
            <span className="font-semibold">Liên kết chia sẻ:</span>
            <div className="flex space-x-4 mt-2">
              <a href="https://www.facebook.com/thiephlna" className="text-blue-600" target="_blank" rel="nofollow">
                <i className="fa fa-facebook fa-lg"></i>
              </a>
              <a href="https://www.facebook.com/thiephlna" className="text-red-600" target="_blank" rel="nofollow">
                <i className="fa fa-google-plus fa-lg"></i>
              </a>
              <a href="https://www.facebook.com/thiephlna" className="text-blue-400" target="_blank" rel="nofollow">
                <i className="fa fa-twitter fa-lg"></i>
              </a>
              <a href="https://www.facebook.com/thiephlna" className="text-red-600" target="_blank" rel="nofollow">
                <i className="fa fa-youtube fa-lg"></i>
              </a>
              <a href="https://www.facebook.com/thiephlna" className="text-pink-600" target="_blank" rel="nofollow">
                <i className="fa fa-pinterest fa-lg"></i>
              </a>
            </div>
          </div>

          {/* Statistics Section */}
          <div>
            <p className="font-semibold"><label>Acc đã bán ra:</label><span className="ml-2">36.584</span></p>
            <p className="font-semibold"><label>Tổng số thành viên:</label><span className="ml-2">170.422</span></p>
            <p className="font-semibold"><label>Đang online:</label><span className="ml-2">1</span></p>
            <p className="font-semibold"><label>Số lần truy cập:</label><span className="ml-2">18.936.412</span></p>
          </div>

          {/* Empty Column for future use or additional information */}
          <div></div>
        </div>

        {/* Address and Copyright */}
        <div className="mt-8 text-center">
          <p>Địa chỉ: Nam Từ Liêm - Hà Nội</p>
          <p className="mt-2">© 2025, Copyright by <a href="https://shopacclienquan.vn/" className="text-blue-400">Bán Acc Liên Quân Giá Rẻ - Uy Tín.</a></p>
        </div>

        {/* Facebook Messenger Chat Plugin */}
        <div id="fb-root"></div>
        <div id="fb-customer-chat" className="fb-customerchat" page_id="112250951770708" attribution="biz_inbox"></div>
      </div>
    </footer>
  );
};

export default Footer;
