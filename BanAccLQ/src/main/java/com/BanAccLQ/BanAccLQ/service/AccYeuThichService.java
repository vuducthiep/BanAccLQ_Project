package com.BanAccLQ.BanAccLQ.service;

import com.BanAccLQ.BanAccLQ.model.AccYeuThich;
import com.BanAccLQ.BanAccLQ.model.NguoiDung;
import com.BanAccLQ.BanAccLQ.model.AccGame;
import com.BanAccLQ.BanAccLQ.repository.AccYeuThichRepository;
import com.BanAccLQ.BanAccLQ.repository.NguoiDungRepository;
import com.BanAccLQ.BanAccLQ.repository.AccGameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccYeuThichService {

    @Autowired
    private AccYeuThichRepository accYeuThichRepository;

    @Autowired
    private NguoiDungRepository nguoiDungRepository;

    @Autowired
    private AccGameRepository accGameRepository;

    public AccYeuThich addAccYeuThich(Integer idNguoiDung, Integer idAccGame) {
        // Tìm người dùng và tài khoản game theo ID
        NguoiDung nguoiDung = nguoiDungRepository.findById(idNguoiDung).orElse(null);
        AccGame accGame = accGameRepository.findById(idAccGame).orElse(null);

        if (nguoiDung == null || accGame == null) {
            throw new IllegalArgumentException("Người dùng hoặc tài khoản game không hợp lệ");
        }

        // Kiểm tra xem người dùng đã yêu thích tài khoản game này chưa
        if (accYeuThichRepository.existsByNguoiDungAndAccGame(nguoiDung, accGame)) {
            throw new IllegalArgumentException("Tài khoản game này đã được yêu thích rồi");
        }

        // Tạo mới đối tượng AccYeuThich
        AccYeuThich accYeuThich = new AccYeuThich();
        accYeuThich.setNguoiDung(nguoiDung);
        accYeuThich.setAccGame(accGame);

        // Lưu vào cơ sở dữ liệu và trả về kết quả
        return accYeuThichRepository.save(accYeuThich);
    }


    public void removeAccYeuThich(Integer idNguoiDung, Integer idAccGame) {
        NguoiDung nguoiDung = nguoiDungRepository.findById(idNguoiDung).orElse(null);
        AccGame accGame = accGameRepository.findById(idAccGame).orElse(null);

        if (nguoiDung == null || accGame == null) {
            throw new IllegalArgumentException("Người dùng hoặc tài khoản game không hợp lệ");
        }

        // Kiểm tra xem tài khoản yêu thích có tồn tại hay không
        boolean exists = accYeuThichRepository.existsByNguoiDungAndAccGame(nguoiDung, accGame);
        if (!exists) {
            throw new IllegalArgumentException("Không tìm thấy tài khoản yêu thích");
        }

        // Xóa accgame yêu thích nếu tồn tại
        accYeuThichRepository.deleteByNguoiDungAndAccGame(nguoiDung, accGame);
    }



}
