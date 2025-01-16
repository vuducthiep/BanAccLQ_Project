package com.BanAccLQ.BanAccLQ.repository;

import com.BanAccLQ.BanAccLQ.DTO.ThongKeDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.BanAccLQ.BanAccLQ.model.LichSuMua;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ThongKeRepository extends JpaRepository<LichSuMua, Integer> {
    @Query("SELECT new com.BanAccLQ.BanAccLQ.DTO.ThongKeDTO(" +
           "MONTH(l.createAt), " +
           "YEAR(l.createAt), " +
           "COUNT(l.id), " +
           "SUM(l.accGame.gia)) " +
           "FROM LichSuMua l " +
           "GROUP BY MONTH(l.createAt), YEAR(l.createAt) " +
           "ORDER BY YEAR(l.createAt), MONTH(l.createAt)")
    List<ThongKeDTO> thongKeTheoThang();

    @Query("SELECT new com.BanAccLQ.BanAccLQ.DTO.ThongKeDTO(" +
           "MONTH(l.createAt), " +
           "YEAR(l.createAt), " +
           "COUNT(l.id), " +
           "SUM(l.accGame.gia)) " +
           "FROM LichSuMua l " +
           "WHERE l.createAt BETWEEN :startDate AND :endDate " +
           "GROUP BY MONTH(l.createAt), YEAR(l.createAt) " +
           "ORDER BY YEAR(l.createAt), MONTH(l.createAt)")
    List<ThongKeDTO> thongKeTheoKhoangThoiGian(
        @Param("startDate") LocalDateTime startDate, 
        @Param("endDate") LocalDateTime endDate
    );
} 