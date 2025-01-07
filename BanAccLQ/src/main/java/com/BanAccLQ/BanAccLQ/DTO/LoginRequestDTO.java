package com.BanAccLQ.BanAccLQ.DTO;

public class LoginRequestDTO {
    private String taiKhoan;
    private String matKhau;

    // Getters và Setters
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
}
