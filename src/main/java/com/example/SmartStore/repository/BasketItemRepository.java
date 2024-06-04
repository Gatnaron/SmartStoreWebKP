package com.example.SmartStore.repository;

import com.example.SmartStore.model.Basket;
import com.example.SmartStore.model.BasketItem;
import com.example.SmartStore.model.Device;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BasketItemRepository extends JpaRepository<BasketItem, Long>{
    List<BasketItem> findByBasket(Basket basket);
    BasketItem findByBasketAndDevice(Basket basket, Device device);
    List<BasketItem> findByBasket_User_Id(Long userId);
}
