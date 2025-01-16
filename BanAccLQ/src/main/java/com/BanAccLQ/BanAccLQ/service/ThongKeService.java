package com.BanAccLQ.BanAccLQ.service;

import com.BanAccLQ.BanAccLQ.DTO.ThongKeDTO;
import com.BanAccLQ.BanAccLQ.repository.ThongKeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ThongKeService {
    @Autowired
    private ThongKeRepository thongKeRepository;

    public List<ThongKeDTO> getThongKeTheoThang() {
        return thongKeRepository.thongKeTheoThang();
    }
} 