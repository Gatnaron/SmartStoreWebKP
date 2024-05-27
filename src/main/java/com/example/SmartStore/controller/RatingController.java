package com.example.SmartStore.controller;

import com.example.SmartStore.model.Rating;
import com.example.SmartStore.service.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ratings")
public class RatingController {

    @Autowired
    private RatingService ratingService;

    @GetMapping
    public List<Rating> getAllRatings() {
        return ratingService.getAllRatings();
    }

    @GetMapping("/{id}")
    public Rating getRatingById(@PathVariable Long id) {
        return ratingService.getRatingById(id);
    }

    @PostMapping
    public Rating createRating(@RequestBody Rating rating) {
        return ratingService.saveRating(rating);
    }

    @DeleteMapping("/{id}")
    public void deleteRating(@PathVariable Long id) {
        ratingService.deleteRating(id);
    }
}
