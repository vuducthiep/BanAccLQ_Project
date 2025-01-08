package com.BanAccLQ.BanAccLQ.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "AccGame")
public class AccGame {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private Double gia;

    private String hinhAnhDaiDien;

    @Column(columnDefinition = "TEXT")
    private String moTa;

    @Column(nullable = false, length = 100)
    private String tenAcc;

    private Integer soLuongTrangPhuc;
    private Integer soLuongTuong;
    private Integer soLuongTrangPhucSS;
    private Integer soLuongTrangPhucSSS;

    private String rankAcc;

    private Integer level;

    private Boolean trangThongTin;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private TrangThai trangThai;

    @ManyToOne
    @JoinColumn(name = "idLoaiAcc")
    private LoaiAccGame loaiAccGame;

    // Mối quan hệ 1-N với AnhAcc
    @OneToMany(mappedBy = "accGame", cascade = CascadeType.ALL)
    private List<AnhAcc> anhAccList;

    // Enum cho trạng thái tài khoản
    public enum TrangThai {
        daBan, chuaBan
    }

    // Getters và Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    public String getMoTa() {
        return moTa;
    }

    public void setMoTa(String moTa) {
        this.moTa = moTa;
    }

    public String getTenAcc() {
        return tenAcc;
    }

    public void setTenAcc(String tenAcc) {
        this.tenAcc = tenAcc;
    }

    public Integer getSoLuongTrangPhuc() {
        return soLuongTrangPhuc;
    }

    public void setSoLuongTrangPhuc(Integer soLuongTrangPhuc) {
        this.soLuongTrangPhuc = soLuongTrangPhuc;
    }

    public Integer getSoLuongTuong() {
        return soLuongTuong;
    }

    public void setSoLuongTuong(Integer soLuongTuong) {
        this.soLuongTuong = soLuongTuong;
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

    public String getRankAcc() {
        return rankAcc;
    }

    public void setRankAcc(String rankAcc) {
        this.rankAcc = rankAcc;
    }

    public Integer getLevel() {
        return level;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }

    public Boolean getTrangThongTin() {
        return trangThongTin;
    }

    public void setTrangThongTin(Boolean trangThongTin) {
        this.trangThongTin = trangThongTin;
    }

    public TrangThai getTrangThai() {
        return trangThai;
    }

    public void setTrangThai(TrangThai trangThai) {
        this.trangThai = trangThai;
    }

    public LoaiAccGame getLoaiAccGame() {
        return loaiAccGame;
    }

    public void setLoaiAccGame(LoaiAccGame loaiAccGame) {
        this.loaiAccGame = loaiAccGame;
    }

    public List<AnhAcc> getAnhAccList() {
        return anhAccList;
    }

    public void setAnhAccList(List<AnhAcc> anhAccList) {
        this.anhAccList = anhAccList;
    }

    // Constructors
    public AccGame() {}
}
