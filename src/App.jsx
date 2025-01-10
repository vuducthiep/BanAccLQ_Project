import Header from './components/Header';
import Banner from './components/Banner';
import Prominent from './components/Prominent';
import ListAcc from './components/ListAcc';
import Profile from './components/Profile'; // Đảm bảo Profile component đã được tạo
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AccDetail from "./components/AccDetail"; // Trang chi tiết tài khoản
import Footer from './components/Footer';
import AccYeuThich from './components/AccYeuThich';
import NapTien from './components/NapTien';
import HomePage from './components/HomePage';
import LichSuMua from './components/LichSuMua';
import ThanhToan from './components/ThanhToan';



// Layout cho các trang chỉ giữ lại Header
const HeaderFooterLayout = ({ children }) => (
  <div>
    <Header />
    {children}
    <Footer />
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Trang chính với layout đầy đủ */}
        <Route path="/" element={<HomePage/>} />
        
        {/* Trang chi tiết tài khoản với chỉ Header */}
        <Route path="/acc/:id" element={<HeaderFooterLayout><AccDetail /></HeaderFooterLayout>} />
        
        {/* Trang thông tin cá nhân với Header */}
        <Route path="/profile" element={<HeaderFooterLayout><Profile /></HeaderFooterLayout>} />
        
        {/* Trang yêu thích */}
        <Route path="/favorites" element={<HeaderFooterLayout><AccYeuThich /></HeaderFooterLayout>} />
        <Route path="/thanhtoan/:accId" element={<HeaderFooterLayout><ThanhToan /></HeaderFooterLayout>} />
        <Route path="/recharge" element={<HeaderFooterLayout> <NapTien/> </HeaderFooterLayout>}/>
        <Route path="/history" element={<HeaderFooterLayout> <LichSuMua/> </HeaderFooterLayout>}/>
        {/* Thêm các route khác nếu cần */}
      </Routes>
    </Router>
  );
}

export default App;
