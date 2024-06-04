package com.example.SmartStore.service;

import com.example.SmartStore.model.*;
import com.example.SmartStore.repository.BasketRepository;
import com.example.SmartStore.repository.BasketItemRepository;
import com.example.SmartStore.repository.DeviceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BasketService {

    @Autowired
    private BasketRepository basketRepository;

    @Autowired
    private BasketItemRepository basketItemRepository;

    @Autowired
    private DeviceRepository deviceRepository;

    public void addToBasket(Long userId, Long deviceId) {
        Basket basket = basketRepository.findByUserId(userId);
        if (basket == null) {
            basket = new Basket();
            basket.setUser(new User(userId)); // Предполагается, что User с таким ID существует
            basket = basketRepository.save(basket);
        }

        Device device = deviceRepository.findById(deviceId).orElseThrow(() -> new RuntimeException("Device not found"));

        BasketItem basketItem = basketItemRepository.findByBasketAndDevice(basket, device);
        if (basketItem != null) {
            basketItem.setQuantity(basketItem.getQuantity() + 1);
        } else {
            basketItem = new BasketItem();
            basketItem.setBasket(basket);
            basketItem.setDevice(device);
            basketItem.setQuantity(1);
        }

        basketItemRepository.save(basketItem);
    }

    public Basket getBasketByUserId(Long userId) {
        return basketRepository.findByUserId(userId);
    }

    public Basket getBasketById(Long basketId) {
        return basketRepository.findById(basketId).orElseThrow(() -> new RuntimeException("Basket not found"));
    }

    public void removeFromBasket(Long itemId) {
        basketItemRepository.deleteById(itemId);
    }

    public void buyAll(Long userId) {
        Basket basket = getBasketByUserId(userId);
        if (basket != null) {
            List<BasketItem> basketItems = basketItemRepository.findByBasket(basket);
            basketItemRepository.deleteAll(basketItems);
        }
    }
}
