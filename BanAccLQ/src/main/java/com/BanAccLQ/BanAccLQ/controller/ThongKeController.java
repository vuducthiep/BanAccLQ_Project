package com.BanAccLQ.BanAccLQ.controller;

import com.BanAccLQ.BanAccLQ.DTO.ThongKeDTO;
import com.BanAccLQ.BanAccLQ.DTO.ThongKeNguoiDungDTO;
import com.BanAccLQ.BanAccLQ.service.ThongKeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/thongke")
public class ThongKeController {
    @Autowired
    private ThongKeService thongKeService;

    @GetMapping("/theo-thang")
    public ResponseEntity<List<ThongKeDTO>> getThongKeTheoThang() {
        List<ThongKeDTO> thongKe = thongKeService.getThongKeTheoThang();
        return ResponseEntity.ok(thongKe);
    }

    @GetMapping("/nguoidung/theo-thang")
    public ResponseEntity<List<ThongKeNguoiDungDTO>> getThongKeNguoiDungTheoThang() {
        List<ThongKeNguoiDungDTO> thongKe = thongKeService.getThongKeNguoiDungTheoThang();
        return ResponseEntity.ok(thongKe);
    }
} 