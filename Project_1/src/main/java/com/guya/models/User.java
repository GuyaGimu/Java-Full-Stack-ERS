package com.guya.models;

import jakarta.persistence.*;
import org.springframework.stereotype.Component;

@Component
@Entity
@Table(name="users")
public class User {

    @Id // this makes the field a primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY) //this makes our pk auto-increment integers
    private int userId;

    //@column is nor necessary unless you want to set BD name or constraints
    @Column(nullable = false) //this column must have a value on insert
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String role = "employee"; // making every new user an employee by default


    /*Foreign key to Reimbursement
    *
    * fetch - defines when the dependency is load
          * LAZY =loads dependency only when it is called
          * EAGER =  loads dependency at runtime
    * @JoinColumn - defines the column that will be used to link these tables in the DB
    * **/
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name ="reimbId") // this links  our FK to the PK in the Reimbursement
    private Reimbursement reimbursement;

    public User() {
    }

    public User(int userId, String firstName, String lastName, String username, String password, String role, Reimbursement reimbursement) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.password = password;
        this.role = role;
        this.reimbursement = reimbursement;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Reimbursement getReimbursement() {
        return reimbursement;
    }

    public void setReimbursement(Reimbursement reimbursement) {
        this.reimbursement = reimbursement;
    }

    @Override
    public String toString() {
        return "User{" +
                "userId=" + userId +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", role='" + role + '\'' +
                ", reimbursement=" + reimbursement +
                '}';
    }
}
