package com.BanAccLQ.BanAccLQ.repository;

import com.BanAccLQ.BanAccLQ.DTO.TopNguoiDungDTO;
import com.BanAccLQ.BanAccLQ.model.NguoiDung;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface NguoiDungRepository extends JpaRepository<NguoiDung, Integer> {
    // Thêm các phương thức truy vấn tùy chỉnh nếu cần
    NguoiDung findByTaiKhoan(String taiKhoan);
    NguoiDung findBySoDienThoai(String soDienThoai);

    @Query("SELECT new com.BanAccLQ.BanAccLQ.DTO.TopNguoiDungDTO(n.ten, n.anhDaiDien, n.soTienDaSuDung) "
            + "FROM NguoiDung n ORDER BY n.soTienDaSuDung DESC LIMIT 5")
    List<TopNguoiDungDTO> findTop5BySoTienDaSuDung();

}
