package com.example.SmartStore.repository;

import com.example.SmartStore.model.Basket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BasketRepository extends JpaRepository<Basket, Long> {
    Basket findByUserId(Long userId);
}
