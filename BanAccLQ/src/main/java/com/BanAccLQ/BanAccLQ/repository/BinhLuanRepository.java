package com.BanAccLQ.BanAccLQ.repository;

import com.BanAccLQ.BanAccLQ.DTO.BinhLuanDTO;
import com.BanAccLQ.BanAccLQ.model.BinhLuan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BinhLuanRepository extends JpaRepository<BinhLuan, Integer> {

    @Query("SELECT new com.BanAccLQ.BanAccLQ.DTO.BinhLuanDTO(b.nguoiDung.id, b.nguoiDung.anhDaiDien, b.nguoiDung.ten, b.nguoiDung.admin, b.noiDung, b.ngayBinhLuan) " +
            "FROM BinhLuan b WHERE b.accGame.id = :idAccGame")
    List<BinhLuanDTO> findBinhLuansByAccGameId(Integer idAccGame);
}