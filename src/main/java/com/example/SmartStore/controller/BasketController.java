package com.example.SmartStore.controller;

import com.example.SmartStore.model.Basket;
import com.example.SmartStore.model.BasketDevice;
import com.example.SmartStore.service.BasketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import com.example.SmartStore.service.BasketDeviceService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/baskets")
public class BasketController {

    @Autowired
    private BasketService basketService;

    @Autowired
    private BasketDeviceService basketDeviceService;

    @GetMapping("/{userId}")
    public List<BasketDevice> getUserBasket(@PathVariable Long userId) {
        Basket basket = basketService.getBasketByUserId(userId);
        return basketDeviceService.getDevicesByBasketId(basket.getId());
    }

    @PostMapping("/{userId}/add")
    public ResponseEntity<Void> addToBasket(@PathVariable Long userId, @RequestBody Map<String, Long> request) {
        Long deviceId = request.get("deviceId");
        Basket basket = basketService.getBasketByUserId(userId);
        basketService.addItemToBasket(basket.getId(), deviceId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/remove/{itemId}")
    public ResponseEntity<Void> removeFromBasket(@PathVariable Long itemId) {
        basketDeviceService.deleteBasketDevice(itemId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{userId}/buyAll")
    public ResponseEntity<Void> buyAll(@PathVariable Long userId) {
        Basket basket = basketService.getBasketByUserId(userId);
        List<BasketDevice> basketDevices = basketDeviceService.getDevicesByBasketId(basket.getId());
        for (BasketDevice basketDevice : basketDevices) {
            basketDeviceService.deleteBasketDevice(basketDevice.getId());
        }
        return ResponseEntity.ok().build();
    }
}
