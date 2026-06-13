package com.example.alleats.Controller;

import com.example.alleats.Service.Menuservice;
import com.example.alleats.model.MenuItem;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/menu")
@RequiredArgsConstructor
public class MenuController {

    private final Menuservice menuservice;

    // GET /api/menu/{restaurantId} - hent menu for en restaurant
    @GetMapping("/{restaurantId}")
    public ResponseEntity<List<MenuItem>> getMenu(@PathVariable Long restaurantId) {
        return ResponseEntity.ok(menuservice.getMenuByRestaurantId(restaurantId));
    }

    // POST /api/menu - opret nyt menu item
    @PostMapping
    public ResponseEntity<MenuItem> createMenuItem(@RequestBody MenuItem menuItem) {
        return ResponseEntity.ok(menuservice.createMenuItem(menuItem));
    }

    // PUT /api/menu/{id} - opdater menu item
    @PutMapping("/{id}")
    public ResponseEntity<MenuItem> updateMenuItem(@PathVariable Long id, @RequestBody MenuItem menuItem) {
        return ResponseEntity.ok(menuservice.updateMenuItem(id, menuItem));
    }
}