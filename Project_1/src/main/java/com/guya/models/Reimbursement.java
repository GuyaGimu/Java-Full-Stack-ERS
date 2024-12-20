package com.guya.models;

import jakarta.persistence.*;
import org.springframework.stereotype.Component;

import java.util.List;


@Component
@Entity
@Table(name="reimbursement")
public class Reimbursement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int reimbId;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private double  amount;

    @Column(nullable = false)
    private String status;


    /*connection to user FK
    *
    * Mapped - identifies the FK field in the user
    * CascadeType.All= any change to a Reimbursement record will affect dependent records
    **/
    @OneToMany(mappedBy = "reimbursement", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<User> users;

    public Reimbursement() {
    }

    public Reimbursement(int reimbId, String description, double amount, String status) {
        this.reimbId = reimbId;
        this.description = description;
        this.amount = amount;
        this.status = status;
    }

    public int getReimbId() {
        return reimbId;
    }

    public void setReimbId(int reimbId) {
        this.reimbId = reimbId;
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

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    @Override
    public String toString() {
        return "Reimbursement{" +
                "reimbId=" + reimbId +
                ", description='" + description + '\'' +
                ", amount=" + amount +
                ", status='" + status + '\'' +
                '}';
    }
}
