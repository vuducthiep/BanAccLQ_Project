package com.BanAccLQ.BanAccLQ.DTO;


import java.math.BigDecimal;

public class TopNguoiDungDTO {

    private String ten;
    private String anhDaiDien;
    private BigDecimal soTienDaSuDung;

    public TopNguoiDungDTO(String ten, String anhDaiDien, BigDecimal soTienDaSuDung) {
        this.ten = ten;
        this.anhDaiDien = anhDaiDien;
        this.soTienDaSuDung = soTienDaSuDung;
    }

    // Getters và Setters
    public String getTen() {
        return ten;
    }

    public void setTen(String ten) {
        this.ten = ten;
    }

    public String getAnhDaiDien() {
        return anhDaiDien;
    }

    public void setAnhDaiDien(String anhDaiDien) {
        this.anhDaiDien = anhDaiDien;
    }

    public BigDecimal getSoTienDaSuDung() {
        return soTienDaSuDung;
    }

    public void setSoTienDaSuDung(BigDecimal soTienDaSuDung) {
        this.soTienDaSuDung = soTienDaSuDung;
    }
}
