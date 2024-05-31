package com.example.SmartStore.repository;

import com.example.SmartStore.model.Basket;
import com.example.SmartStore.model.BasketItem;
import com.example.SmartStore.model.Device;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BasketItemRepository extends JpaRepository<BasketItem, Long>{
    BasketItem findByBasketAndDevice(Basket basket, Device device);
}
