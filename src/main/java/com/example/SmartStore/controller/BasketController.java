package com.example.SmartStore.controller;

import com.example.SmartStore.model.Basket;
import com.example.SmartStore.model.BasketDevice;
import com.example.SmartStore.model.BasketItem;
import com.example.SmartStore.service.BasketService;
import com.example.SmartStore.repository.BasketItemRepository;
import com.example.SmartStore.repository.DeviceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/baskets")
public class BasketController {

    @Autowired
    private BasketService basketService;

    @Autowired
    private BasketItemRepository basketItemRepository;

    @Autowired
    private DeviceRepository deviceRepository;

    @GetMapping("/{userId}")
    public ResponseEntity<List<BasketItem>> getUserBasket(@PathVariable Long userId) {
        List<BasketItem> basketItems = basketService.getBasketItemsByUserId(userId);
        if (basketItems == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(basketItems);
    }

    @PostMapping("/add/{userId}/{deviceId}")
    public ResponseEntity<String> addToBasket(@PathVariable Long userId, @PathVariable Long deviceId) {
        try {
            basketService.addToBasket(userId, deviceId);
            return ResponseEntity.ok("Товар успешно добавлен в корзину");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ошибка при добавлении товара в корзину");
        }
    }

    @DeleteMapping("/remove/{itemId}")
    public ResponseEntity<Void> removeFromBasket(@PathVariable Long itemId) {
        try {
            basketService.removeFromBasket(itemId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/{userId}/buyAll")
    public ResponseEntity<Void> buyAll(@PathVariable Long userId) {
        try {
            basketService.buyAll(userId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
