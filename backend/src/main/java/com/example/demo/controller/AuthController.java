package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

@PostMapping("/register")
public ResponseEntity<?> register(@RequestBody User user) {
    user.setPassword(encoder.encode(user.getPassword())); // Encrypt here!
    return ResponseEntity.ok(userRepository.save(user));
}

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        return userRepository.findByEmail(user.getEmail())
            // Temporarily using direct equals check instead of encoder.matches
            .filter(dbUser -> user.getPassword().equals(dbUser.getPassword()))
            .map(dbUser -> ResponseEntity.ok(dbUser))
            .map(dbUser -> ResponseEntity.ok("Login Success"))
            .orElse(ResponseEntity.status(401).body("Invalid Credentials"));
    }
}