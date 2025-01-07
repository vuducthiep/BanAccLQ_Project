package com.BanAccLQ.BanAccLQ.service;

import com.BanAccLQ.BanAccLQ.DTO.TopNguoiDungDTO;
import com.BanAccLQ.BanAccLQ.Util.HashingUtil;
import com.BanAccLQ.BanAccLQ.model.NguoiDung;
import com.BanAccLQ.BanAccLQ.repository.NguoiDungRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NguoiDungService {

    @Autowired
    private NguoiDungRepository nguoiDungRepository;

    public NguoiDung getNguoiDungById(Integer id) {
        return nguoiDungRepository.findById(id).orElse(null);
    }

    public List<NguoiDung> getAllNguoiDung() {
        return nguoiDungRepository.findAll();
    }


    public NguoiDung validateLogin(String taiKhoan, String matKhau) {
        NguoiDung nguoiDung = nguoiDungRepository.findByTaiKhoan(taiKhoan);

        if (nguoiDung != null) {
            // Mã hóa mật khẩu đầu vào bằng SHA-256
            String hashedPassword = HashingUtil.hashPassword(matKhau);

            // So sánh mật khẩu đã mã hóa với mật khẩu trong cơ sở dữ liệu
            if (nguoiDung.getMatKhau().equals(hashedPassword)) {
                return nguoiDung; // Đăng nhập thành công
            }
        }

        return null; // Đăng nhập thất bại
    }

    public boolean registerNguoiDung(NguoiDung nguoiDung) {
        // Kiểm tra tài khoản hoặc số điện thoại đã tồn tại
        if (nguoiDungRepository.findByTaiKhoan(nguoiDung.getTaiKhoan()) != null ||
                nguoiDungRepository.findBySoDienThoai(nguoiDung.getSoDienThoai()) != null) {
            return false; // Đăng ký thất bại
        }

        // Mã hóa mật khẩu
        String matKhauMaHoa = HashingUtil.hashPassword(nguoiDung.getMatKhau());
        nguoiDung.setMatKhau(matKhauMaHoa);

        // Lưu người dùng vào cơ sở dữ liệu
        nguoiDungRepository.save(nguoiDung);
        return true; // Đăng ký thành công
    }

    public List<TopNguoiDungDTO> getTop5NguoiDung() {
        return nguoiDungRepository.findTop5BySoTienDaSuDung();
    }


    // Các phương thức xử lý nghiệp vụ khác
}
