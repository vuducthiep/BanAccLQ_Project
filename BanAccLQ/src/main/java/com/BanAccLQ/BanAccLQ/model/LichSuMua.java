package com.BanAccLQ.BanAccLQ.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "LichSuMua")
public class LichSuMua {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "idNguoiDung", nullable = false)
    private NguoiDung nguoiDung;

    @ManyToOne
    @JoinColumn(name = "idAccGame", nullable = false)
    private AccGame accGame;


    @Column(name = "createAt", nullable = false, updatable = false)
    private LocalDateTime createAt = LocalDateTime.now();

    // Getter và Setter
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public NguoiDung getNguoiDung() {
        return nguoiDung;
    }

    public void setNguoiDung(NguoiDung nguoiDung) {
        this.nguoiDung = nguoiDung;
    }

    public AccGame getAccGame() {
        return accGame;
    }

    public void setAccGame(AccGame accGame) {
        this.accGame = accGame;
    }



    public LocalDateTime getCreateAt() {
        return createAt;
    }

    public void setCreateAt(LocalDateTime createAt) {
        this.createAt = createAt;
    }
}
