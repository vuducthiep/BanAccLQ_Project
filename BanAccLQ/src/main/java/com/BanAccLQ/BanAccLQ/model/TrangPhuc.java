package com.BanAccLQ.BanAccLQ.model;

import jakarta.persistence.*;

@Entity
@Table(name = "TrangPhuc")
public class TrangPhuc {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String tenTrangPhuc; // Tên trang phục

    @Column(nullable = false)
    private String loaiTrangPhuc; // Loại trang phục (ví dụ: áo, giày...)


    // Getters và Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTenTrangPhuc() {
        return tenTrangPhuc;
    }

    public void setTenTrangPhuc(String tenTrangPhuc) {
        this.tenTrangPhuc = tenTrangPhuc;
    }

    public String getLoaiTrangPhuc() {
        return loaiTrangPhuc;
    }

    public void setLoaiTrangPhuc(String loaiTrangPhuc) {
        this.loaiTrangPhuc = loaiTrangPhuc;
    }


}
