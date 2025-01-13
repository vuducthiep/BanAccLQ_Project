package com.BanAccLQ.BanAccLQ.controller;

import com.BanAccLQ.BanAccLQ.DTO.AccDetailDTO;
import com.BanAccLQ.BanAccLQ.DTO.ListAccHomePageDTO;
import com.BanAccLQ.BanAccLQ.DTO.TopAccGameDTO;
import com.BanAccLQ.BanAccLQ.exception.ResourceNotFoundException;
import com.BanAccLQ.BanAccLQ.model.AccGame;
import com.BanAccLQ.BanAccLQ.model.AnhAcc;
import com.BanAccLQ.BanAccLQ.service.AccGameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/accgame")
public class AccGameController {

    @Autowired
    private AccGameService accGameService;

    @GetMapping("/getAllAcc")
    public List<AccGame> getAllAccGames() {
        return accGameService.getAllAccGames();
    }

    // hieenr thị tất cả chi tiết acc
    @GetMapping("/{id}")
    public ResponseEntity<AccGame> getAccGameById(@PathVariable Integer id) {
        Optional<AccGame> accGame = accGameService.getAccGameById(id);
        return accGame.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    //hieenr thị chi tiết acc cho gn dùng, ko có tk mk
    @GetMapping("/acc-detail/{id}")
    public ResponseEntity<AccDetailDTO> getAccDetail(@PathVariable Integer id) {
        // Retrieve the AccGame using the service
        AccGame accGame = accGameService.getAccGameById(id)
                .orElseThrow(() -> new ResourceNotFoundException("AccGame not found with id: " + id));

        // Extract the LoaiAccGame data (getting the 'tenLoai' field)
        String loaiAccGame = accGame.getLoaiAccGame() != null ? accGame.getLoaiAccGame().getTenLoai() : null;

        // Create and return the AccDetailDTO
        AccDetailDTO accDetailDTO = new AccDetailDTO(
                accGame.getId(),
                accGame.getTenAcc(),
                accGame.getMoTa(),
                accGame.getRankAcc(),
                accGame.getSoLuongTuong(),
                accGame.getSoLuongTrangPhuc(),
                accGame.getLevel(),
                accGame.getSoLuongTrangPhucSS(),
                accGame.getSoLuongTrangPhucSSS(),
                accGame.getGia(),
                loaiAccGame,  // Correctly assigning 'tenLoai' to 'loaiAccGame'
                accGame.getTrangThai().toString(),
                accGame.getHinhAnhDaiDien()
        );

        return ResponseEntity.ok(accDetailDTO);
    }


    @GetMapping("/listAccHomePage")
    public List<ListAccHomePageDTO> getAvailableAccGames(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "16") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<AccGame> accGamesPage = accGameService.getAccGamesByTrangThai(AccGame.TrangThai.chuaBan, pageable);

        return accGamesPage.stream()
                .map(accGame -> new ListAccHomePageDTO(
                        accGame.getId(),
                        accGame.getTenAcc(),
                        accGame.getRankAcc(),
                        accGame.getSoLuongTuong(),
                        accGame.getSoLuongTrangPhuc(),
                        accGame.getGia(),
                        accGame.getHinhAnhDaiDien()
                ))
                .collect(Collectors.toList());
    }




    @GetMapping("/topAccGame")
    public List<TopAccGameDTO> getTopAccGames() {
        return accGameService.getTopAccGames();
    }

    @GetMapping("/{id}/images")
    public ResponseEntity<List<AnhAcc>> getAnhAccByAccGame(@PathVariable Integer id) {
        List<AnhAcc> anhAccList = accGameService.getAnhAccByAccGame(id);
        return ResponseEntity.ok(anhAccList);
    }


}
