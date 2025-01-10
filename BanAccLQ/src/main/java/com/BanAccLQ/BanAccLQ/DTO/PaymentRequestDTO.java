package com.BanAccLQ.BanAccLQ.DTO;

public class PaymentRequestDTO {
    private Integer userId;
    private Integer accGameId;

    // Getters and Setters
    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getAccGameId() {
        return accGameId;
    }

    public void setAccGameId(Integer accGameId) {
        this.accGameId = accGameId;
    }
}
