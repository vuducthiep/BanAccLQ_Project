package com.BanAccLQ.BanAccLQ.service;


import com.BanAccLQ.BanAccLQ.DTO.BinhLuanDTO;
import com.BanAccLQ.BanAccLQ.DTO.BinhLuanRequest;
import com.BanAccLQ.BanAccLQ.model.AccGame;
import com.BanAccLQ.BanAccLQ.model.BinhLuan;
import com.BanAccLQ.BanAccLQ.model.NguoiDung;
import com.BanAccLQ.BanAccLQ.repository.AccGameRepository;
import com.BanAccLQ.BanAccLQ.repository.BinhLuanRepository;
import com.BanAccLQ.BanAccLQ.repository.NguoiDungRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class BinhLuanService {

    @Autowired
    private BinhLuanRepository binhLuanRepository;

    @Autowired
    private AccGameRepository accGameRepository;

    @Autowired
    private NguoiDungRepository nguoiDungRepository;


    public List<BinhLuanDTO> getBinhLuansByAccGameId(Integer idAccGame) {
        return binhLuanRepository.findBinhLuansByAccGameId(idAccGame);
    }

    public BinhLuan addBinhLuan(BinhLuanRequest binhLuanRequest) {
        // Kiểm tra xem accGame và nguoiDung có tồn tại trong CSDL hay không
        AccGame accGame = accGameRepository.findById(binhLuanRequest.getIdAccGame()).orElse(null);
        NguoiDung nguoiDung = nguoiDungRepository.findById(binhLuanRequest.getIdNguoiDung()).orElse(null);

        if (accGame == null || nguoiDung == null) {
            throw new RuntimeException("AccGame or NguoiDung not found");
        }

        // Tạo đối tượng BinhLuan mới
        BinhLuan binhLuan = new BinhLuan();
        binhLuan.setAccGame(accGame);
        binhLuan.setNguoiDung(nguoiDung);
        binhLuan.setNoiDung(binhLuanRequest.getNoiDung());
        binhLuan.setNgayBinhLuan(LocalDateTime.now());

        // Lưu vào cơ sở dữ liệu
        return binhLuanRepository.save(binhLuan);
    }


}
