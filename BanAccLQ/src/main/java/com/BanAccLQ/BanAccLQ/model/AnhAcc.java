
package com.BanAccLQ.BanAccLQ.model;

import jakarta.persistence.*;

@Entity
@Table(name = "AnhAcc")
public class AnhAcc {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String urlAnh;

    @Column(columnDefinition = "TEXT")
    private String moTa;

    @ManyToOne
    @JoinColumn(name = "idAccGame", nullable = false)
    private AccGame accGame;

    public String getUrlAnh() {
        return urlAnh;
    }

    public void setUrlAnh(String urlAnh) {
        this.urlAnh = urlAnh;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getMoTa() {
        return moTa;
    }

    public void setMoTa(String moTa) {
        this.moTa = moTa;
    }

    public AccGame getAccGame() {
        return accGame;
    }

    public void setAccGame(AccGame accGame) {
        this.accGame = accGame;
    }
}
