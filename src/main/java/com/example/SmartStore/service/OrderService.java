package com.example.SmartStore.service;

import com.example.SmartStore.model.*;
import com.example.SmartStore.repository.BasketItemRepository;
import com.example.SmartStore.repository.OrderRepository;
import com.example.SmartStore.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private BasketItemRepository basketItemRepository;

    @Autowired
    private UserRepository userRepository;

    public Order createOrder(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        List<BasketItem> basketItems = basketItemRepository.findByBasket_User_Id(userId);

        if (basketItems.isEmpty()) {
            throw new RuntimeException("No items in basket");
        }

        double totalAmount = basketItems.stream()
                .mapToDouble(item -> item.getDevice().getPrice() * item.getQuantity())
                .sum();

        Order order = new Order();
        order.setUser(user);
        order.setDateTime(LocalDateTime.now());
        order.setTotalAmount(totalAmount);

        orderRepository.save(order);

        // Clean the basket after creating the order
        basketItemRepository.deleteAll(basketItems);

        return order;
    }
}
