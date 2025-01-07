package com.BanAccLQ.BanAccLQ.controller;

import com.BanAccLQ.BanAccLQ.DTO.LoginRequestDTO;
import com.BanAccLQ.BanAccLQ.DTO.RegisterRequestDTO;
import com.BanAccLQ.BanAccLQ.DTO.TopNguoiDungDTO;
import com.BanAccLQ.BanAccLQ.Util.HashingUtil;
import com.BanAccLQ.BanAccLQ.Util.JwtUtil;
import com.BanAccLQ.BanAccLQ.model.NguoiDung;
import com.BanAccLQ.BanAccLQ.service.NguoiDungService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/nguoidung")
public class NguoiDungController {

    @Autowired
    private NguoiDungService nguoiDungService;

    @GetMapping("/{id}")
    public NguoiDung getNguoiDung(@PathVariable Integer id) {
        return nguoiDungService.getNguoiDungById(id);
    }

    // API lấy danh sách tất cả người dùng
    @GetMapping("/all")
    public List<NguoiDung> getAllNguoiDung() {
        return nguoiDungService.getAllNguoiDung();
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDTO loginRequest) {
        NguoiDung nguoiDung = nguoiDungService.validateLogin(loginRequest.getTaiKhoan(), loginRequest.getMatKhau());
        if (nguoiDung != null) {
            // Tạo JWT token
            String token = JwtUtil.generateToken(nguoiDung.getTaiKhoan());

            // Trả về token và thời hạn
            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("id", nguoiDung.getId()); // Trả về ID người dùng hoặc thông tin khác nếu cần
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Sai tài khoản hoặc mật khẩu");
    }



    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequestDTO registerRequest) {
        // Tạo đối tượng NguoiDung từ dữ liệu đăng ký
        NguoiDung nguoiDung = new NguoiDung();
        nguoiDung.setTaiKhoan(registerRequest.getTaiKhoan());
        nguoiDung.setMatKhau(registerRequest.getMatKhau());
        nguoiDung.setTen(registerRequest.getTen());
        nguoiDung.setSoDienThoai(registerRequest.getSoDienThoai());

        // Kiểm tra đăng ký người dùng
        boolean isRegistered = nguoiDungService.registerNguoiDung(nguoiDung);
        if (!isRegistered) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Tài khoản hoặc số điện thoại đã tồn tại");
        }

        return ResponseEntity.status(HttpStatus.CREATED).body("Đăng ký thành công");
    }

    @GetMapping("/top-nguoi-dung")
    public List<TopNguoiDungDTO> getTop5NguoiDung() {
        return nguoiDungService.getTop5NguoiDung();
    }



    // Các API khác
}
