package com.BanAccLQ.BanAccLQ.controller;


import com.BanAccLQ.BanAccLQ.DTO.BinhLuanDTO;
import com.BanAccLQ.BanAccLQ.DTO.BinhLuanRequest;
import com.BanAccLQ.BanAccLQ.model.BinhLuan;
import com.BanAccLQ.BanAccLQ.service.BinhLuanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/binhluan")
public class BinhLuanController {

    @Autowired
    private BinhLuanService binhLuanService;

    @GetMapping("/accgame/{idAccGame}")
    public List<BinhLuanDTO> getBinhLuansByAccGameId(@PathVariable Integer idAccGame) {
        return binhLuanService.getBinhLuansByAccGameId(idAccGame);
    }
    // API thêm bình luận
    @PostMapping("/add")
    public ResponseEntity<String> addBinhLuan(@RequestBody BinhLuanRequest binhLuanRequest) {
        binhLuanService.addBinhLuan(binhLuanRequest);
        return ResponseEntity.ok("success");
    }
}
