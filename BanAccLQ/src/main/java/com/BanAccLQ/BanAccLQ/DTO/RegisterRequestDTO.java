package com.BanAccLQ.BanAccLQ.DTO;

public class RegisterRequestDTO {
    private String ten;
    private String taiKhoan;
    private String matKhau;
    private String soDienThoai;

    // Constructor mặc định
    public RegisterRequestDTO() {}

    // Constructor với tất cả các tham số
    public RegisterRequestDTO(String ten, String taiKhoan, String matKhau, String soDienThoai) {
        this.ten = ten;
        this.taiKhoan = taiKhoan;
        this.matKhau = matKhau;
        this.soDienThoai = soDienThoai;
    }

    // Getters và Setters
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
}
