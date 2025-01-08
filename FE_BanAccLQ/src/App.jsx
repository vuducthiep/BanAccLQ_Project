import Header from './components/Header';
import Banner from './components/Banner';
import Prominent from './components/Prominent';
import ListAcc from './components/ListAcc';
import Profile from './components/Profile'; // Đảm bảo Profile component đã được tạo
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AccDetail from "./components/AccDetail"; // Trang chi tiết tài khoản
import Footer from './components/Footer';

// Layout cho các trang có đầy đủ Header, Banner, Prominent, và ListAcc
const MainLayout = ({ children }) => (
  <div>
    <Header />
    <Banner />
    <Prominent />
    {children}
    <Footer/>
  </div>
);

// Layout cho các trang chỉ giữ lại Header
const HeaderOnlyLayout = ({ children }) => (
  <div>
    <Header />
    {children}
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Trang chính với layout đầy đủ */}
        <Route path="/" element={<MainLayout><ListAcc /></MainLayout>} />
        
        {/* Trang chi tiết tài khoản với chỉ Header */}
        <Route path="/acc/:id" element={<HeaderOnlyLayout><AccDetail /></HeaderOnlyLayout>} />
        
        {/* Trang thông tin cá nhân với Header */}
        <Route path="/profile" element={<HeaderOnlyLayout><Profile /></HeaderOnlyLayout>} />
        
        {/* Thêm các route khác nếu cần */}
      </Routes>
    </Router>
  );
}

export default App;
