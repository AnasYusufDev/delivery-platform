package com.example.alleats.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Timestamp when the order was placed
    private LocalDateTime createdAt;

    // Total price in DKK
    private Double totalPrice;

    // Current status of the order
    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    // The restaurant this order belongs to
    @ManyToOne
    @JoinColumn(name = "restaurant_id")
    private Restaurant restaurant;

    public enum OrderStatus {
        PENDING,
        CONFIRMED,
        DELIVERED
    }
}