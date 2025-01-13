package com.BanAccLQ.BanAccLQ.DTO;

public class AccDetailDTO {

    private Integer id;
    private String tenAcc;
    private String moTa;
    private String rankAcc;
    private Integer soLuongTuong;
    private Integer soLuongTrangPhuc;
    private Integer level;
    private Integer soLuongTrangPhucSS;
    private Integer soLuongTrangPhucSSS;
    private Double gia;
    private String loaiAccGame;  // Loại tài khoản
    private String trangThai;    // Trạng thái
    private String hinhAnhDaiDien; // Hình ảnh đại diện

    // Getters và Setters
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

    public String getMoTa() {
        return moTa;
    }

    public void setMoTa(String moTa) {
        this.moTa = moTa;
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

    public Integer getLevel() {
        return level;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }

    public Integer getSoLuongTrangPhucSS() {
        return soLuongTrangPhucSS;
    }

    public void setSoLuongTrangPhucSS(Integer soLuongTrangPhucSS) {
        this.soLuongTrangPhucSS = soLuongTrangPhucSS;
    }

    public Integer getSoLuongTrangPhucSSS() {
        return soLuongTrangPhucSSS;
    }

    public void setSoLuongTrangPhucSSS(Integer soLuongTrangPhucSSS) {
        this.soLuongTrangPhucSSS = soLuongTrangPhucSSS;
    }

    public Double getGia() {
        return gia;
    }

    public void setGia(Double gia) {
        this.gia = gia;
    }

    public String getLoaiAccGame() {
        return loaiAccGame;
    }

    public void setLoaiAccGame(String loaiAccGame) {
        this.loaiAccGame = loaiAccGame;
    }

    public String getTrangThai() {
        return trangThai;
    }

    public void setTrangThai(String trangThai) {
        this.trangThai = trangThai;
    }

    public String getHinhAnhDaiDien() {
        return hinhAnhDaiDien;
    }

    public void setHinhAnhDaiDien(String hinhAnhDaiDien) {
        this.hinhAnhDaiDien = hinhAnhDaiDien;
    }

    // Constructor
    public AccDetailDTO(Integer id, String tenAcc, String moTa, String rankAcc, Integer soLuongTuong,
                        Integer soLuongTrangPhuc, Integer level, Integer soLuongTrangPhucSS, Integer soLuongTrangPhucSSS,
                        Double gia, String loaiAccGame, String trangThai, String hinhAnhDaiDien) {
        this.id = id;
        this.tenAcc = tenAcc;
        this.moTa = moTa;
        this.rankAcc = rankAcc;
        this.soLuongTuong = soLuongTuong;
        this.soLuongTrangPhuc = soLuongTrangPhuc;
        this.level = level;
        this.soLuongTrangPhucSS = soLuongTrangPhucSS;
        this.soLuongTrangPhucSSS = soLuongTrangPhucSSS;
        this.gia = gia;
        this.loaiAccGame = loaiAccGame;
        this.trangThai = trangThai;
        this.hinhAnhDaiDien = hinhAnhDaiDien;
    }
}
