import React, { useState } from 'react';

const SupportPhone = () => {
    const [isListVisible, setIsListVisible] = useState(false);
    const [isVisible, setIsVisible] = useState(true); // Trạng thái để kiểm soát việc ẩn/hiện cả biểu tượng điện thoại và chữ "Hỗ trợ"
    const [isRippleVisible, setIsRippleVisible] = useState(false); // Trạng thái điều khiển hiệu ứng sóng

    const toggleList = () => {
        setIsListVisible(!isListVisible);
    };

    const hidePhoneIcon = (e) => {
        e.stopPropagation();  // Ngừng sự kiện bubble để tránh ảnh hưởng đến biểu tượng điện thoại
        setIsVisible(false); // Ẩn biểu tượng điện thoại và chữ "Hỗ trợ"
        setIsListVisible(false); // Ẩn danh sách hỗ trợ
        setIsRippleVisible(false); // Ẩn hiệu ứng sóng khi ẩn biểu tượng điện thoại
    };

    const handlePhoneIconClick = () => {
        setIsRippleVisible(true); // Hiển thị hiệu ứng sóng khi nhấn vào biểu tượng điện thoại
        setTimeout(() => {
            setIsRippleVisible(false); // Ẩn hiệu ứng sóng sau một thời gian
        }, 600);
        toggleList(); // Hiển thị/ẩn danh sách hỗ trợ
    };

    return (
        <div>
            <style>
                {`
                    /* Các style hiện tại của bạn */
                    @keyframes shake {
                        0% { transform: translateX(0); }
                        25% { transform: translateX(-10px); }
                        50% { transform: translateX(10px); }
                        75% { transform: translateX(-10px); }
                        100% { transform: translateX(0); }
                    }

                    @keyframes flash {
                        0% { opacity: 1; }
                        50% { opacity: 0.5; }
                        100% { opacity: 1; }
                    }

                    @keyframes ripple {
                        0% {
                            transform: scale(0);
                            opacity: 1;
                        }
                        100% {
                            transform: scale(4);
                            opacity: 0;
                        }
                    }

                    .animate-shake {
                        animation: shake 0.5s ease-in-out infinite;
                    }

                    .animate-flash {
                        animation: flash 0.5s ease-in-out infinite;
                    }

                    .ripple-effect {
                        position: absolute;
                        border-radius: 50%;
                        background-color: rgba(255, 0, 0, 0.3);
                        animation: ripple 0.6s linear;
                        width: 48px;  /* Điều chỉnh kích thước */
                        height: 48px; /* Điều chỉnh kích thước */
                        left: 50%;
                        top: 50%;
                        transform: translate(-50%, -50%);
                    }
                `}
            </style>

            {/* Biểu tượng điện thoại với hiệu ứng sóng */}
            {isVisible && (
                <div
                    onClick={handlePhoneIconClick}
                    className="fixed bottom-10 right-10 cursor-pointer flex items-center justify-center bg-red-500 text-white p-4 rounded-full shadow-lg hover:bg-red-600 transition duration-300 transform hover:scale-110 animate-shake animate-flash z-50"
                >
                    <i className="fa fa-phone fa-lg"></i>
                </div>
            )}

            {/* Nút X để ẩn biểu tượng điện thoại và chữ "Hỗ trợ" */}
            {isVisible && (
                <span
                    onClick={hidePhoneIcon}
                    className="fixed bottom-20 right-10 text-red-900 font-bold cursor-pointer z-50"
                >
                    X
                </span>
            )}

            {/* Hiệu ứng sóng xung quanh chỉ hiển thị khi biểu tượng được nhấn */}
            {isRippleVisible && <div className="ripple-effect" />}

            {/* Danh sách hỗ trợ */}
            {isListVisible && (
                <div className="fixed bottom-16 right-10 bg-white shadow-lg p-4 rounded-lg w-60 max-h-60 overflow-y-auto z-40">
                    <h3 className="font-semibold text-lg text-red-600 mb-4">Danh sách hỗ trợ</h3>
                    <ul>
                        <li className="mb-2">1. Hỗ trợ 24/7</li>
                        <li className="mb-2">2. Gặp sự cố về tài khoản?</li>
                        <li className="mb-2">3. Liên hệ qua email support@shop.com</li>
                        <li className="mb-2">4. Trò chuyện trực tiếp với đại lý</li>
                        <li className="mb-2">5. Địa chỉ cửa hàng: Hà Nội</li>
                    </ul>
                </div>
            )}

            {/* Chữ Hỗ Trợ */}
            {isVisible && (
                <div
                    className="fixed bottom-2 right-10 text-lg font-semibold text-red-600 cursor-pointer z-50"
                    onClick={handlePhoneIconClick}
                >
                    Hỗ Trợ
                </div>
            )}
        </div>
    );
};

export default SupportPhone;
