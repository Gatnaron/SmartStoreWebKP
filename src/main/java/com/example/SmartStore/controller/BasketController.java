package com.example.SmartStore.controller;

import com.example.SmartStore.model.Basket;
import com.example.SmartStore.model.BasketItem;
import com.example.SmartStore.service.BasketService;
import com.example.SmartStore.repository.BasketItemRepository;
import com.example.SmartStore.repository.DeviceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/baskets")
public class BasketController {

    @Autowired
    private BasketService basketService;

    @Autowired
    private BasketItemRepository basketItemRepository;

    @Autowired
    private DeviceRepository deviceRepository;

    @GetMapping("/user/{userId}")
    public ResponseEntity<Basket> getUserBasket(@PathVariable Long userId) {
        Basket basket = basketService.getBasketByUserId(userId);
        if (basket != null) {
            return ResponseEntity.ok(basket);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @GetMapping("/{basketId}/items")
    public ResponseEntity<List<Map<String, Object>>> getBasketItems(@PathVariable Long basketId) {
        Basket basket = basketService.getBasketById(basketId);
        if (basket != null) {
            List<Map<String, Object>> items = basket.getItems().stream().map(item -> {
                Map<String, Object> itemMap = new HashMap<>();
                itemMap.put("id", item.getId());
                itemMap.put("quantity", item.getQuantity());
                Map<String, Object> deviceMap = new HashMap<>();
                deviceMap.put("id", item.getDevice().getId());
                deviceMap.put("name", item.getDevice().getName());
                deviceMap.put("price", item.getDevice().getPrice());
                deviceMap.put("img", item.getDevice().getImg());  // Убедитесь, что поле img существует в классе Device
                itemMap.put("device", deviceMap);
                return itemMap;
            }).collect(Collectors.toList());
            return ResponseEntity.ok(items);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
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
