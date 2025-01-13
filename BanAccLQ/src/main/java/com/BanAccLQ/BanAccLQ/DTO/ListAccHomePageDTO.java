package com.BanAccLQ.BanAccLQ.DTO;

public class ListAccHomePageDTO {
    private Integer id;
    private String tenAcc;
    private String rankAcc;
    private Integer soLuongTuong;
    private Integer soLuongTrangPhuc;
    private Double gia;
    private String hinhAnhDaiDien; // Thêm thuộc tính hình ảnh đại diện

    // Constructor
    public ListAccHomePageDTO(Integer id, String tenAcc, String rankAcc, Integer soLuongTuong, Integer soLuongTrangPhuc, Double gia, String hinhAnhDaiDien) {
        this.id = id;
        this.tenAcc = tenAcc;
        this.rankAcc = rankAcc;
        this.soLuongTuong = soLuongTuong;
        this.soLuongTrangPhuc = soLuongTrangPhuc;
        this.gia = gia;
        this.hinhAnhDaiDien = hinhAnhDaiDien;
    }

    // Getters and Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTenAcc() {
        return tenAcc;
    }

    public void setTenAcc(String tenAcc) {
        this.tenAcc = tenAcc;
    }

    public String getRankAcc() {
        return rankAcc;
    }

    public void setRankAcc(String rankAcc) {
        this.rankAcc = rankAcc;
    }

    public Integer getSoLuongTuong() {
        return soLuongTuong;
    }

    public void setSoLuongTuong(Integer soLuongTuong) {
        this.soLuongTuong = soLuongTuong;
    }

    public Integer getSoLuongTrangPhuc() {
        return soLuongTrangPhuc;
    }

    public void setSoLuongTrangPhuc(Integer soLuongTrangPhuc) {
        this.soLuongTrangPhuc = soLuongTrangPhuc;
    }

    public Double getGia() {
        return gia;
    }

    public void setGia(Double gia) {
        this.gia = gia;
    }

    public String getHinhAnhDaiDien() {
        return hinhAnhDaiDien;
    }

    public void setHinhAnhDaiDien(String hinhAnhDaiDien) {
        this.hinhAnhDaiDien = hinhAnhDaiDien;
    }
}
