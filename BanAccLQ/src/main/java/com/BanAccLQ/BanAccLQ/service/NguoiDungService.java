package com.BanAccLQ.BanAccLQ.service;

import com.BanAccLQ.BanAccLQ.DTO.NapTienDTO;
import com.BanAccLQ.BanAccLQ.DTO.TopNguoiDungDTO;
import com.BanAccLQ.BanAccLQ.Util.HashingUtil;
import com.BanAccLQ.BanAccLQ.model.AccGame;
import com.BanAccLQ.BanAccLQ.model.LichSuMua;
import com.BanAccLQ.BanAccLQ.model.NguoiDung;
import com.BanAccLQ.BanAccLQ.repository.AccYeuThichRepository;
import com.BanAccLQ.BanAccLQ.repository.LichSuMuaRepository;
import com.BanAccLQ.BanAccLQ.repository.NguoiDungRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class NguoiDungService {

    @Autowired
    private NguoiDungRepository nguoiDungRepository;

    @Autowired
    private AccYeuThichRepository accYeuThichRepository;

    @Autowired
    private LichSuMuaRepository lichSuMuaRepository;

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


    public String napTien(NapTienDTO napTienDTO) {
        Optional<NguoiDung> optionalNguoiDung = nguoiDungRepository.findById(napTienDTO.getId());

        if (!optionalNguoiDung.isPresent()) {
            return "Người dùng không tồn tại";
        }

        NguoiDung nguoiDung = optionalNguoiDung.get();
        BigDecimal soTienMoi = nguoiDung.getSoTien().add(napTienDTO.getSoTien());
        nguoiDung.setSoTien(soTienMoi);
        nguoiDungRepository.save(nguoiDung);

        return "Nạp tiền thành công";
    }

    // Lấy danh sách tài khoản game yêu thích của người dùng
    public List<AccGame> getFavoriteGames(Integer userId) {
        NguoiDung nguoiDung = nguoiDungRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Người dùng không tồn tại"));

        // Lấy danh sách tài khoản game yêu thích của người dùng
        return accYeuThichRepository.findByNguoiDung(nguoiDung).stream()
                .map(accYeuThich -> accYeuThich.getAccGame())
                .collect(Collectors.toList());
    }

    public List<AccGame> getAllAccGamesFromLichSuMua(Integer nguoiDungId) {
        List<LichSuMua> lichSuMuaList = lichSuMuaRepository.findByNguoiDungId(nguoiDungId);
        List<AccGame> accGames = new ArrayList<>();

        for (LichSuMua lichSuMua : lichSuMuaList) {
            accGames.add(lichSuMua.getAccGame());
        }

        return accGames;
    }
}
