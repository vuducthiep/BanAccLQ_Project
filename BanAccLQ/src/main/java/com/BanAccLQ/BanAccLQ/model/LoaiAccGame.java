package com.BanAccLQ.BanAccLQ.model;

import jakarta.persistence.*;

@Entity
@Table(name = "LoaiAccGame")
public class LoaiAccGame {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 50)
    private String tenLoai;

    @Column(columnDefinition = "TEXT")
    private String moTa;

    // Getters và Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTenLoai() {
        return tenLoai;
    }

    public void setTenLoai(String tenLoai) {
        this.tenLoai = tenLoai;
    }

    public String getMoTa() {
        return moTa;
    }

    public void setMoTa(String moTa) {
        this.moTa = moTa;
    }

    // Constructors
    public LoaiAccGame() {}

    public LoaiAccGame(String tenLoai, String moTa) {
        this.tenLoai = tenLoai;
        this.moTa = moTa;
    }
}
