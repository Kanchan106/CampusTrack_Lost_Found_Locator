package com.campustrack.dto;

import lombok.Data;

@Data
public class UserDto {
    private String fullName;
    private String contactNumber;
    private String email;
    private String password;
    private String role;
    private String department;
}
