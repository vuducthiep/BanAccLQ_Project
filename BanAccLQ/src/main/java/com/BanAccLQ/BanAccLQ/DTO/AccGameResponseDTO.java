package com.BanAccLQ.BanAccLQ.DTO;
import java.math.BigDecimal;

public class AccGameResponseDTO {
    private Integer id;
    private String taiKhoan;
    private String matKhau;
    private BigDecimal gia;
    private String trangThai;
    private String errorMessage;  // Thêm trường này để chứa thông báo lỗi

    // Constructor mặc định
    public AccGameResponseDTO() {}

    // Constructor với tham số để trả về thông báo lỗi
    public AccGameResponseDTO(String errorMessage) {
        this.errorMessage = errorMessage;
    }

    // Getter và Setter cho các trường
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    public BigDecimal getGia() {
        return gia;
    }

    public void setGia(BigDecimal gia) {
        this.gia = gia;
    }

    public String getTrangThai() {
        return trangThai;
    }

    public void setTrangThai(String trangThai) {
        this.trangThai = trangThai;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }
}
