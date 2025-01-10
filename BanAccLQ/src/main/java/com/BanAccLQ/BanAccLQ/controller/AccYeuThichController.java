package com.BanAccLQ.BanAccLQ.controller;

import com.BanAccLQ.BanAccLQ.model.AccGame;
import com.BanAccLQ.BanAccLQ.service.AccYeuThichService;
import com.BanAccLQ.BanAccLQ.DTO.AccYeuThichDTO;
import com.BanAccLQ.BanAccLQ.service.NguoiDungService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/yeuthich")
public class AccYeuThichController {

    @Autowired
    private AccYeuThichService accYeuThichService;

    @Autowired
    private NguoiDungService nguoiDungService;

    // API thêm tài khoản vào danh sách yêu thích
    @PostMapping
    public ResponseEntity<?> addAccYeuThich(@RequestBody AccYeuThichDTO accYeuThichDTO) {
        try {
            // Thêm tài khoản yêu thích
            accYeuThichService.addAccYeuThich(accYeuThichDTO.getIdNguoiDung(), accYeuThichDTO.getIdAccGame());
            return new ResponseEntity<>("Tài khoản game đã được thêm vào danh sách yêu thích", HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // API xóa tài khoản khỏi danh sách yêu thích
    @DeleteMapping
    public ResponseEntity<?> removeAccYeuThich(@RequestBody AccYeuThichDTO accYeuThichDTO) {
        try {
            // Xóa tài khoản yêu thích
            accYeuThichService.removeAccYeuThich(accYeuThichDTO.getIdNguoiDung(), accYeuThichDTO.getIdAccGame());
            return new ResponseEntity<>("Tài khoản game đã được xóa khỏi danh sách yêu thích", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/user/{id}")
    public List<AccGame> getFavoriteGames(@PathVariable Integer id) {
        return nguoiDungService.getFavoriteGames(id);
    }
}
