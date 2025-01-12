package com.BanAccLQ.BanAccLQ.DTO;

import java.time.LocalDateTime;

public class BinhLuanDTO {

    private Integer idNguoiDung;
    private String anhDaiDien;
    private String ten;
    private boolean admin;
    private String noiDung;
    private LocalDateTime ngayBinhLuan;

    // Constructor, Getters và Setters
    public BinhLuanDTO(Integer idNguoiDung, String anhDaiDien, String ten, boolean admin, String noiDung, LocalDateTime ngayBinhLuan) {
        this.idNguoiDung = idNguoiDung;
        this.anhDaiDien = anhDaiDien;
        this.ten = ten;
        this.admin = admin;
        this.noiDung = noiDung;
        this.ngayBinhLuan = ngayBinhLuan;
    }

    public Integer getIdNguoiDung() {
        return idNguoiDung;
    }

    public void setIdNguoiDung(Integer idNguoiDung) {
        this.idNguoiDung = idNguoiDung;
    }

    public String getAnhDaiDien() {
        return anhDaiDien;
    }

    public void setAnhDaiDien(String anhDaiDien) {
        this.anhDaiDien = anhDaiDien;
    }

    public String getTen() {
        return ten;
    }

    public void setTen(String ten) {
        this.ten = ten;
    }

    public boolean isAdmin() {
        return admin;
    }

    public void setAdmin(boolean admin) {
        this.admin = admin;
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
