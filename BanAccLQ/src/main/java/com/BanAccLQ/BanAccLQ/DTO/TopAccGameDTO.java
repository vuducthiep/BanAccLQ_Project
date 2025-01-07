package com.BanAccLQ.BanAccLQ.DTO;


public class TopAccGameDTO {
    private int id;
    private double gia;
    private long soLuongYeuThich;

    // Constructor
    public TopAccGameDTO(int id, double gia, long soLuongYeuThich) {
        this.id = id;
        this.gia = gia;
        this.soLuongYeuThich = soLuongYeuThich;
    }

    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public double getGia() {
        return gia;
    }

    public void setGia(double gia) {
        this.gia = gia;
    }

    public long getSoLuongYeuThich() {
        return soLuongYeuThich;
    }

    public void setSoLuongYeuThich(long soLuongYeuThich) {
        this.soLuongYeuThich = soLuongYeuThich;
    }
}
