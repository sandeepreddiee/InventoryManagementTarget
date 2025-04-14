package com.target.inventory.controller;

import com.target.inventory.dto.LoginRequest;
import com.target.inventory.dto.LoginResponse;
import com.target.inventory.model.User;
import com.target.inventory.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        User user = userService.authenticate(request.getEmail(), request.getPassword());
        if (user == null) {
            throw new RuntimeException("Invalid credentials");
        }
        return new LoginResponse(
                user.getUser_id(),
                user.getName(),
                user.getEmail(),
                user.getRole()
        );
    }
}
