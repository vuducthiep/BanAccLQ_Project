package com.BanAccLQ.BanAccLQ.controller;

import com.BanAccLQ.BanAccLQ.DTO.TopAccGameDTO;
import com.BanAccLQ.BanAccLQ.model.AccGame;
import com.BanAccLQ.BanAccLQ.model.AnhAcc;
import com.BanAccLQ.BanAccLQ.service.AccGameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/accgame")
public class AccGameController {

    @Autowired
    private AccGameService accGameService;

    @GetMapping("/getAllAcc")
    public List<AccGame> getAllAccGames() {
        return accGameService.getAllAccGames();
    }

    @GetMapping("/{id}")
    public ResponseEntity<AccGame> getAccGameById(@PathVariable Integer id) {
        Optional<AccGame> accGame = accGameService.getAccGameById(id);
        return accGame.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/accChuaBan")
    public ResponseEntity<?> getAvailableAccGames() {
        List<AccGame> availableAccGames = accGameService.getAvailableAccGames();

        if (availableAccGames.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(availableAccGames);
    }

    @GetMapping("/topAccGame")
    public List<TopAccGameDTO> getTopAccGames() {
        return accGameService.getTopAccGames();
    }

    @GetMapping("/accGame/{id}/images")
    public ResponseEntity<List<AnhAcc>> getAnhAccByAccGame(@PathVariable Integer id) {
        List<AnhAcc> anhAccList = accGameService.getAnhAccByAccGame(id);
        return ResponseEntity.ok(anhAccList);
    }

}
