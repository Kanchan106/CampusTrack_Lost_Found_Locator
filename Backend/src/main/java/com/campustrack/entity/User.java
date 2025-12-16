// src/main/java/com/campustrack/entity/User.java
package com.campustrack.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;
    private String contactNumber;
    @Column(unique = true)
    private String email;
    private String password;
    private String role;
    private String department;

    // getters and setters
    public Long getId() { return id; }
    public String getFullName() { return fullName; }
    public String getContactNumber() { return contactNumber; }
    public String getEmail() { return email; }
    public String getPassword() { return password; }
    public String getRole() { return role; }
    public String getDepartment() { return department; }
    public void setId(Long id) { this.id = id; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public void setContactNumber(String contactNumber) { this.contactNumber = contactNumber; }
    public void setEmail(String email) { this.email = email; }
    public void setPassword(String password) { this.password = password; }
    public void setRole(String role) { this.role = role; }
    public void setDepartment(String department) { this.department = department; }
}