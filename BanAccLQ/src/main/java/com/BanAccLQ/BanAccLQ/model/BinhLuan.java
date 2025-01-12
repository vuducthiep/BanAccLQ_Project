package com.BanAccLQ.BanAccLQ.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "binhluan")
public class BinhLuan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "idAccGame", nullable = false)
    private AccGame accGame;

    @ManyToOne
    @JoinColumn(name = "idNguoiDung", nullable = false)
    private NguoiDung nguoiDung;

    @Column(name = "noiDung", nullable = false)
    private String noiDung;

    @Column(name = "ngayBinhLuan", nullable = false, updatable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime ngayBinhLuan;

    // Constructors, getters, and setters

    public BinhLuan() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public AccGame getAccGame() {
        return accGame;
    }

    public void setAccGame(AccGame accGame) {
        this.accGame = accGame;
    }

    public NguoiDung getNguoiDung() {
        return nguoiDung;
    }

    public void setNguoiDung(NguoiDung nguoiDung) {
        this.nguoiDung = nguoiDung;
    }

    public String getNoiDung() {
        return noiDung;
    }

    public void setNoiDung(String noiDung) {
        this.noiDung = noiDung;
    }

    public LocalDateTime getNgayBinhLuan() {
        return ngayBinhLuan;
    }

    public void setNgayBinhLuan(LocalDateTime ngayBinhLuan) {
        this.ngayBinhLuan = ngayBinhLuan;
    }
}
