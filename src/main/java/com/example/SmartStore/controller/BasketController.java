package com.example.SmartStore.controller;

import com.example.SmartStore.model.Basket;
import com.example.SmartStore.model.BasketDevice;
import com.example.SmartStore.model.BasketItem;
import com.example.SmartStore.service.BasketService;
import com.example.SmartStore.repository.BasketItemRepository;
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

    @GetMapping("/{userId}")
    public List<BasketDevice> getUserBasket(@PathVariable Long userId) {
        return basketService.getBasketDevicesByUserId(userId);
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
            basketItemRepository.deleteById(itemId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/{userId}/buyAll")
    public ResponseEntity<Void> buyAll(@PathVariable Long userId) {
        try {
            Basket basket = basketService.getBasketByUserId(userId);
            if (basket == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
            List<BasketItem> items = basket.getItems();
            for (BasketItem item : items) {
                basketItemRepository.delete(item);
            }
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
