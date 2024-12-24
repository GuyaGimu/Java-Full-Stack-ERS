package com.guya.models.DTOs;

import com.guya.models.User;
import jakarta.persistence.*;

import java.util.List;

public class IncomingReimbursementDTO {


    private String description;

    private double  amount;

    private String status;

    private int userId;

    public IncomingReimbursementDTO() {
    }

    public IncomingReimbursementDTO(String description, double amount, String status, int userId) {
        this.description = description;
        this.amount = amount;
        this.status = status;
        this.userId = userId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }


    @PrePersist
    public void setDefaultStatus() {
        if (this.status == null) {
            this.status = "PENDING";
        }
    }

    @Override
    public String toString() {
        return "IncomingReimbursementDTO{" +
                ", description='" + description + '\'' +
                ", amount=" + amount +
                ", status='" + status + '\'' +
                ", userId=" + userId +
                '}';
    }
}
