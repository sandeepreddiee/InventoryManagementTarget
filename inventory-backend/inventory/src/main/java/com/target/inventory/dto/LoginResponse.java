package com.target.inventory.dto;

public class LoginResponse {
    private Long user_id;
    private String name;
    private String email;
    private String role;

    public LoginResponse(Long user_id, String name, String email, String role) {
        this.user_id = user_id;
        this.name = name;
        this.email = email;
        this.role = role;
    }

    public Long getUser_id() {
        return user_id;
    }

    public void setUser_id(Long user_id) {
        this.user_id = user_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
