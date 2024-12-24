package com.guya.services;

import com.guya.models.DTOs.LoginResponse;
import com.guya.models.User;
import com.guya.DAOs.UserDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {
    @Autowired
    private UserDAO userDAO;

    public LoginResponse authenticate(User user) {
        Optional<User> existingUser = userDAO.findByusername(user.getUsername());
        if (existingUser.isPresent() && existingUser.get().getPassword().equals(user.getPassword())) {
            // Generate a token (for simplicity, we'll use a fake token here)
            String token = "Bearer " + user.getUsername() + "_token";
            String role = existingUser.get().getRole().toLowerCase(); // Assuming User has a role field
            int userId = existingUser.get().getUserId();   // Assuming User has an ID field

            return new LoginResponse(token, role, userId);
        } else {
            throw new RuntimeException("Invalid credentials");
        }
    }


    public User getCurrentUser(String token) {
        // Decode token and find user (simplified logic for demo purposes)
        String username = token.split("_")[0].replace("Bearer ", "");
        return userDAO.findByusername(username).orElseThrow(() -> new RuntimeException("Invalid token"));
    }
}

