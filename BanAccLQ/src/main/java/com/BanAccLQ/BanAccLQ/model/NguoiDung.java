package com.BanAccLQ.BanAccLQ.model;

import jakarta.persistence.*; // Đảm bảo đúng thư viện JPA (jakarta.persistence)
import java.math.BigDecimal;

@Entity
@Table(name = "NguoiDung")
public class NguoiDung {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private Boolean admin = false; // Giá trị mặc định

    @Column(nullable = false)
    private String ten;

    @Column(nullable = false, unique = true, length = 50)
    private String taiKhoan;

    private String anhDaiDien;

    @Column(nullable = false)
    private String matKhau;

    @Column(nullable = false, unique = true)
    private String soDienThoai;

    @Column(nullable = false)
    private BigDecimal soTien = BigDecimal.ZERO; // Sử dụng BigDecimal cho tiền tệ

    @Column(nullable = false)
    private BigDecimal soTienDaSuDung = BigDecimal.ZERO; // Cột mới, lưu số tiền đã sử dụng

    // Default Constructor
    public NguoiDung() {
    }

    // Constructor với tất cả các tham số
    public NguoiDung(Integer id, Boolean admin, String ten, String taiKhoan, String anhDaiDien,
                     String matKhau, String soDienThoai, BigDecimal soTien, BigDecimal soTienDaSuDung) {
        this.id = id;
        this.admin = admin;
        this.ten = ten;
        this.taiKhoan = taiKhoan;
        this.anhDaiDien = anhDaiDien;
        this.matKhau = matKhau;
        this.soDienThoai = soDienThoai;
        this.soTien = soTien;
        this.soTienDaSuDung = soTienDaSuDung;
    }

    // Getters và Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Boolean getAdmin() {
        return admin;
    }

    public void setAdmin(Boolean admin) {
        this.admin = admin;
    }

    public String getTen() {
        return ten;
    }

    public void setTen(String ten) {
        this.ten = ten;
    }

    public String getTaiKhoan() {
        return taiKhoan;
    }

    public void setTaiKhoan(String taiKhoan) {
        this.taiKhoan = taiKhoan;
    }

    public String getAnhDaiDien() {
        return anhDaiDien;
    }

    public void setAnhDaiDien(String anhDaiDien) {
        this.anhDaiDien = anhDaiDien;
    }

    public String getMatKhau() {
        return matKhau;
    }

    public void setMatKhau(String matKhau) {
        this.matKhau = matKhau;
    }

    public String getSoDienThoai() {
        return soDienThoai;
    }

    public void setSoDienThoai(String soDienThoai) {
        this.soDienThoai = soDienThoai;
    }

    public BigDecimal getSoTien() {
        return soTien;
    }

    public void setSoTien(BigDecimal soTien) {
        this.soTien = soTien;
    }

    public BigDecimal getSoTienDaSuDung() {
        return soTienDaSuDung;
    }

    public void setSoTienDaSuDung(BigDecimal soTienDaSuDung) {
        this.soTienDaSuDung = soTienDaSuDung;
    }

    @Override
    public String toString() {
        return "NguoiDung{" +
                "id=" + id +
                ", admin=" + admin +
                ", ten='" + ten + '\'' +
                ", taiKhoan='" + taiKhoan + '\'' +
                ", anhDaiDien='" + anhDaiDien + '\'' +
                ", matKhau='" + matKhau + '\'' +
                ", soDienThoai='" + soDienThoai + '\'' +
                ", soTien=" + soTien +
                ", soTienDaSuDung=" + soTienDaSuDung +
                '}';
    }
}