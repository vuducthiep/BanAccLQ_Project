package com.BanAccLQ.BanAccLQ.DTO;

public class ThongKeDTO {
    private int thang;
    private int nam;
    private long soLuongBan;
    private double tongTien;

    // Constructor
    public ThongKeDTO(int thang, int nam, long soLuongBan, double tongTien) {
        this.thang = thang;
        this.nam = nam;
        this.soLuongBan = soLuongBan;
        this.tongTien = tongTien;
    }

    // Getters
    public int getThang() {
        return thang;
    }

    public int getNam() {
        return nam;
    }

    public long getSoLuongBan() {
        return soLuongBan;
    }

    public double getTongTien() {
        return tongTien;
    }

    // Setters
    public void setThang(int thang) {
        this.thang = thang;
    }

    public void setNam(int nam) {
        this.nam = nam;
    }

    public void setSoLuongBan(long soLuongBan) {
        this.soLuongBan = soLuongBan;
    }

    public void setTongTien(double tongTien) {
        this.tongTien = tongTien;
    }

    // Thêm constructor không tham số nếu cần
    public ThongKeDTO() {
    }
}
