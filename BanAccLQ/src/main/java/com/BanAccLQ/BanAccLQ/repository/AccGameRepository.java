package com.BanAccLQ.BanAccLQ.repository;

import com.BanAccLQ.BanAccLQ.DTO.TopAccGameDTO;
import com.BanAccLQ.BanAccLQ.model.AccGame;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccGameRepository extends JpaRepository<AccGame, Integer> {
    List<AccGame> findByTrangThai(AccGame.TrangThai trangThai);

    @Query("SELECT new com.BanAccLQ.BanAccLQ.DTO.TopAccGameDTO(a.id, a.gia, COUNT(ay.id)) " +
            "FROM AccGame a LEFT JOIN AccYeuThich ay ON a.id = ay.accGame.id " +
            "GROUP BY a.id, a.gia " +
            "ORDER BY COUNT(ay.id) DESC")
    List<TopAccGameDTO> findTopAccGameByYeuThich();


}