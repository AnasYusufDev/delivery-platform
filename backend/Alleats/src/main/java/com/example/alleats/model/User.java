package com.example.alleats.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Full name of the user
    private String name;

    // Email must be unique
    @Column(unique = true)
    private String email;

    // Password - only used for email/password login
    // Null if user logs in with Google
    private String password;

    // Google user ID - only used for Google login
    // Null if user logs in with email/password
    private String googleId;

    // Login method used by the user
    @Enumerated(EnumType.STRING)
    private LoginType loginType;

    // User role in the app
    @Enumerated(EnumType.STRING)
    private Role role;

    // Available login methods
    public enum LoginType {
        EMAIL,   // Login with email and password
        GOOGLE   // Login with Google account
    }

    // Available user roles
    public enum Role {
        KUNDE,       // Orders food
        RESTAURANT,  // Receives and prepares food
        BUD          // Delivers food
    }
}