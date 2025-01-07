package com.BanAccLQ.BanAccLQ.model;


import jakarta.persistence.*;


@Entity
@Table(name = "accgame_trangphuc")
public class AccGameTrangPhuc {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "idAccGame", nullable = false)
    private int idAccGame;

    @Column(name = "idTrangPhuc", nullable = false)
    private int idTrangPhuc;

    // Constructors
    public AccGameTrangPhuc() {}

    public AccGameTrangPhuc(int idAccGame, int idTrangPhuc) {
        this.idAccGame = idAccGame;
        this.idTrangPhuc = idTrangPhuc;
    }

    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getIdAccGame() {
        return idAccGame;
    }

    public void setIdAccGame(int idAccGame) {
        this.idAccGame = idAccGame;
    }

    public int getIdTrangPhuc() {
        return idTrangPhuc;
    }

    public void setIdTrangPhuc(int idTrangPhuc) {
        this.idTrangPhuc = idTrangPhuc;
    }
}

