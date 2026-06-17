package com.example.alleats.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "menu_items")
public class MenuItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Name of the dish
    private String name;

    // Description of the dish
    private String description;

    // Price in DKK
    private Double price;

    // Image URL
    private String imageUrl;

    // Category (e.g. Burger, Drink, Dessert)
    private String category;

    // The restaurant this item belongs to
    @ManyToOne
    @JoinColumn(name = "restaurant_id")
    private Restaurant restaurant;
}