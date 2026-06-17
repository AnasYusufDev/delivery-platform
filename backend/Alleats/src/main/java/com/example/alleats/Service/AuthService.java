package com.example.alleats.Service;

import com.example.alleats.model.User;
import com.example.alleats.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    // Register a new user with email and password
    public User registerWithEmail(String name, String email, String password) {

        // Check if email is already in use
        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException("Email is already in use");
        }

        // Create new user
        User user = new User();
        user.setName(name);
        user.setEmail(email);

        // Encrypt password before saving to database
        user.setPassword(passwordEncoder.encode(password));
        user.setRole(User.Role.KUNDE);
        user.setLoginType(User.LoginType.EMAIL);

        // Save user to database
        return userRepository.save(user);
    }

    // Login with email and password
    public User loginWithEmail(String email, String password) {

        // Find user by email
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Verify password
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Incorrect password");
        }

        return user;
    }
}