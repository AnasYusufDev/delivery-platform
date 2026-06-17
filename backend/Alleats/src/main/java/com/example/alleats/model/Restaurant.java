package com.example.alleats.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "restaurants")
public class Restaurant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Restaurant name
    private String name;

    // Short description of the restaurant
    private String description;

    // Street address
    private String address;

    // Image URL
    private String imageUrl;

    // Whether the restaurant is currently open
    private boolean open;

    // Food category (e.g. Pizza, Burger, Sushi)
    private String category;
}