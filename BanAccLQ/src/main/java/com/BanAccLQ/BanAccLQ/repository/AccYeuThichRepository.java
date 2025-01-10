package com.BanAccLQ.BanAccLQ.repository;

import com.BanAccLQ.BanAccLQ.model.AccYeuThich;
import com.BanAccLQ.BanAccLQ.model.NguoiDung;
import com.BanAccLQ.BanAccLQ.model.AccGame;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface AccYeuThichRepository extends JpaRepository<AccYeuThich, Integer> {

    // Kiểm tra xem tài khoản yêu thích đã tồn tại chưa (dựa trên người dùng và tài khoản game)
    boolean existsByNguoiDungAndAccGame(NguoiDung nguoiDung, AccGame accGame);

    // Tìm tài khoản yêu thích theo người dùng và tài khoản game
    Optional<AccYeuThich> findByNguoiDungAndAccGame(NguoiDung nguoiDung, AccGame accGame);

    // Xóa tài khoản yêu thích theo người dùng và tài khoản game (Spring Data JPA đã hỗ trợ)
    @Transactional
    void deleteByNguoiDungAndAccGame(NguoiDung nguoiDung, AccGame accGame);

    List<AccYeuThich> findByNguoiDung(NguoiDung nguoiDung);


}
