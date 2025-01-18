package com.BanAccLQ.BanAccLQ.DTO;

public class ThongKeNguoiDungDTO {
    private int thang;
    private int nam;
    private long nguoiDung;
    
    // Constructor mặc định
    public ThongKeNguoiDungDTO() {
    }
    
    // Constructor đầy đủ tham số
    public ThongKeNguoiDungDTO(int thang, int nam, long nguoiDung) {
        this.thang = thang;
        this.nam = nam;
        this.nguoiDung = nguoiDung;
    }
    
    // Getters và Setters
    public int getThang() {
        return thang;
    }

    public void setThang(int thang) {
        this.thang = thang;
    }

    public int getNam() {
        return nam;
    }

    public void setNam(int nam) {
        this.nam = nam;
    }

    public long getNguoiDung() {
        return nguoiDung;
    }

    public void setNguoiDung(long nguoiDung) {
        this.nguoiDung = nguoiDung;
    }
}
