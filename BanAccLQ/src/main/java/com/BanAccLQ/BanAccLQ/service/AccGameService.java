package com.BanAccLQ.BanAccLQ.service;

import com.BanAccLQ.BanAccLQ.DTO.TopAccGameDTO;
import com.BanAccLQ.BanAccLQ.model.AccGame;
import com.BanAccLQ.BanAccLQ.model.AnhAcc;
import com.BanAccLQ.BanAccLQ.repository.AccGameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AccGameService {

    @Autowired
    private AccGameRepository accGameRepository;

    public List<AccGame> getAllAccGames() {
        return accGameRepository.findAll();
    }

    public Optional<AccGame> getAccGameById(Integer id) {
        return accGameRepository.findById(id);
    }

    public Page<AccGame> getAccGamesByTrangThai(AccGame.TrangThai trangThai, Pageable pageable) {
        return accGameRepository.findByTrangThai(trangThai, pageable);
    }

    public List<TopAccGameDTO> getTopAccGames() {
        List<TopAccGameDTO> topAccGames = accGameRepository.findTopAccGameByYeuThich();
        return topAccGames.size() > 5 ? topAccGames.subList(0, 5) : topAccGames;
    }

    public List<AnhAcc> getAnhAccByAccGame(Integer accGameId) {
        Optional<AccGame> accGame = accGameRepository.findById(accGameId);
        return accGame.map(AccGame::getAnhAccList).orElse(List.of());
    }





}
