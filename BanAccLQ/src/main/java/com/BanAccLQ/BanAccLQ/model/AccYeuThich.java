package com.BanAccLQ.BanAccLQ.model;
import jakarta.persistence.*;

@Entity
@Table(name = "AccYeuThich")
public class AccYeuThich {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "idNguoiDung", nullable = false)
    private NguoiDung nguoiDung;

    @ManyToOne
    @JoinColumn(name = "idAccGame", nullable = false)
    private AccGame accGame;

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
}
