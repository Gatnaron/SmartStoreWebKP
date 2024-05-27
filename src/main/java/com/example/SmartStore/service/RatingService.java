package com.example.SmartStore.service;

import com.example.SmartStore.model.Rating;
import com.example.SmartStore.repository.RatingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RatingService {

    @Autowired
    private RatingRepository ratingRepository;

    public List<Rating> getAllRatings() {
        return ratingRepository.findAll();
    }

    public Rating getRatingById(Long id) {
        return ratingRepository.findById(id).orElse(null);
    }

    public Rating saveRating(Rating rating) {
        return ratingRepository.save(rating);
    }

    public void deleteRating(Long id) {
        ratingRepository.deleteById(id);
    }
}
