package com.example.alleats.Service;

import com.example.alleats.model.Restaurant;
import com.example.alleats.repository.RestaurantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RestaurantService {

    private final RestaurantRepository restaurantRepository;

    public List<Restaurant> getAllRestaurants() {
        return restaurantRepository.findAll();
    }

    public Restaurant getRestaurantById(Long id) {
        return restaurantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Restaurant ikke fundet"));
    }

    public Restaurant createRestaurant(Restaurant restaurant) {
        return restaurantRepository.save(restaurant);
    }

    public Restaurant updateRestaurant(Long id, Restaurant updated) {
        Restaurant existing = restaurantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Restaurant ikke fundet"));
        existing.setName(updated.getName());
        existing.setDescription(updated.getDescription());
        existing.setAddress(updated.getAddress());
        existing.setImageUrl(updated.getImageUrl());
        existing.setCategory(updated.getCategory());
        existing.setOpen(updated.isOpen());
        return restaurantRepository.save(existing);
    }
}