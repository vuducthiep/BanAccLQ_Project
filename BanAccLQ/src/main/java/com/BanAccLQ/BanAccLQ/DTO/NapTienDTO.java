package com.BanAccLQ.BanAccLQ.DTO;

import java.math.BigDecimal;

public class NapTienDTO {
    private Integer id;
    private BigDecimal soTien;

    // Getters and Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public BigDecimal getSoTien() {
        return soTien;
    }

    public void setSoTien(BigDecimal soTien) {
        this.soTien = soTien;
    }
}
