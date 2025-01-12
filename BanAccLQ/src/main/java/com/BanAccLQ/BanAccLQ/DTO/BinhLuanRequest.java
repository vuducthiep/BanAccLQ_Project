package com.BanAccLQ.BanAccLQ.DTO;


public class BinhLuanRequest {

    private Integer idAccGame;
    private Integer idNguoiDung;
    private String noiDung;

    // Constructors, getters, setters
    public BinhLuanRequest(Integer idAccGame, Integer idNguoiDung, String noiDung) {
        this.idAccGame = idAccGame;
        this.idNguoiDung = idNguoiDung;
        this.noiDung = noiDung;
    }

    public Integer getIdAccGame() {
        return idAccGame;
    }

    public void setIdAccGame(Integer idAccGame) {
        this.idAccGame = idAccGame;
    }

    public Integer getIdNguoiDung() {
        return idNguoiDung;
    }

    public void setIdNguoiDung(Integer idNguoiDung) {
        this.idNguoiDung = idNguoiDung;
    }

    public String getNoiDung() {
        return noiDung;
    }

    public void setNoiDung(String noiDung) {
        this.noiDung = noiDung;
    }
}
