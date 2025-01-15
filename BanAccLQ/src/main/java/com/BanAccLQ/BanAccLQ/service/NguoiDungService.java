package com.BanAccLQ.BanAccLQ.service;

import com.BanAccLQ.BanAccLQ.DTO.AccContainerDTO;
import com.BanAccLQ.BanAccLQ.DTO.NapTienDTO;
import com.BanAccLQ.BanAccLQ.DTO.TopNguoiDungDTO;
import com.BanAccLQ.BanAccLQ.DTO.UpdateNguoiDungDTO_NguoiDung;
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
import java.util.regex.Pattern;
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


    public List<AccContainerDTO> getFavoriteGames(Integer userId) {
        NguoiDung nguoiDung = getNguoiDungById(userId);

        return accYeuThichRepository.findByNguoiDung(nguoiDung).stream()
                .map(accYeuThich -> {
                    var accGame = accYeuThich.getAccGame();
                        return new AccContainerDTO(
                            accGame.getId(),
                            accGame.getTenAcc(),
                            accGame.getRankAcc(),
                            accGame.getSoLuongTuong(),
                            accGame.getSoLuongTrangPhuc(),
                            accGame.getGia(),
                            accGame.getHinhAnhDaiDien()
                        );
                }).collect(Collectors.toList());
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



    public List<AccGame> getAllAccGamesFromLichSuMua(Integer nguoiDungId) {
        List<LichSuMua> lichSuMuaList = lichSuMuaRepository.findByNguoiDungId(nguoiDungId);
        List<AccGame> accGames = new ArrayList<>();

        for (LichSuMua lichSuMua : lichSuMuaList) {
            accGames.add(lichSuMua.getAccGame());
        }

        return accGames;
    }

    public NguoiDung updateUserInfo(Integer id, UpdateNguoiDungDTO_NguoiDung updateNguoiDungDTO) {
        // Kiểm tra thông tin đầu vào
        if (updateNguoiDungDTO.getTen() == null || updateNguoiDungDTO.getTen().trim().isEmpty()) {
            throw new RuntimeException("Tên không được để trống");
        }

        if (updateNguoiDungDTO.getMatKhau() == null || updateNguoiDungDTO.getMatKhau().trim().isEmpty()) {
            throw new RuntimeException("Mật khẩu không được để trống");
        }

        if (updateNguoiDungDTO.getSoDienThoai() == null || updateNguoiDungDTO.getSoDienThoai().trim().isEmpty()) {
            throw new RuntimeException("Số điện thoại không được để trống");
        }

        // Kiểm tra số điện thoại có hợp lệ hay không
        String phoneRegex = "^(\\+84|0)[0-9]{9}$";
        if (!Pattern.matches(phoneRegex, updateNguoiDungDTO.getSoDienThoai())) {
            throw new RuntimeException("Số điện thoại không hợp lệ");
        }

        // Tìm người dùng theo ID
        NguoiDung nguoiDung = nguoiDungRepository.findById(id).orElseThrow(() -> new RuntimeException("Người dùng không tồn tại"));

        // Cập nhật thông tin
        nguoiDung.setTen(updateNguoiDungDTO.getTen());
        String hashedPassword = HashingUtil.hashPassword(updateNguoiDungDTO.getMatKhau());
        nguoiDung.setMatKhau(hashedPassword);
        nguoiDung.setSoDienThoai(updateNguoiDungDTO.getSoDienThoai());

        // Lưu thông tin người dùng đã cập nhật
        return nguoiDungRepository.save(nguoiDung);
    }

}
