package com.example.SmartStore.controller;

import com.example.SmartStore.model.Device;
import com.example.SmartStore.model.Order;
import com.example.SmartStore.model.User;
import com.example.SmartStore.repository.DeviceRepository;
import com.example.SmartStore.repository.OrderRepository;
import com.example.SmartStore.repository.UserRepository;
import com.example.SmartStore.service.DeviceInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DeviceRepository deviceRepository;

    @GetMapping("/{userId}")
    public ResponseEntity<List<Order>> getOrdersByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(orderRepository.findByUserId(userId));
    }

    public static class OrderRequest {
        private Long userId;
        private List<Long> deviceIds;

        // Getters and setters
        public Long getUserId() {
            return userId;
        }

        public void setUserId(Long userId) {
            this.userId = userId;
        }

        public List<Long> getDeviceIds() {
            return deviceIds;
        }

        public void setDeviceIds(List<Long> deviceIds) {
            this.deviceIds = deviceIds;
        }
    }
    @PostMapping
    public ResponseEntity<String> createOrder(@RequestBody OrderRequest orderRequest) {
        // Проверяем наличие пользователя
        Optional<User> userOpt = userRepository.findById(orderRequest.getUserId());
        if (!userOpt.isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid user ID");
        }

        // Проверяем наличие устройств
        List<Device> devices = deviceRepository.findAllById(orderRequest.getDeviceIds());
        if (devices.isEmpty() || devices.size() != orderRequest.getDeviceIds().size()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid device ID(s)");
        }

        // Создаем заказ
        Order order = new Order();
        order.setUser(userOpt.get());
        order.setDevices(devices);
        orderRepository.save(order);
        return ResponseEntity.ok("Order created successfully");
    }
}
