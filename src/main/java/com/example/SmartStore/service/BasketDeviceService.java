package com.example.SmartStore.service;

import com.example.SmartStore.model.BasketDevice;
import com.example.SmartStore.repository.BasketDeviceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BasketDeviceService {

    @Autowired
    private BasketDeviceRepository basketDeviceRepository;

    public BasketDevice saveBasketDevice(BasketDevice basketDevice) {
        return basketDeviceRepository.save(basketDevice);
    }

    public List<BasketDevice> getAllBasketDevices() {
        return basketDeviceRepository.findAll();
    }

    public BasketDevice getBasketDeviceById(Long id) {
        return basketDeviceRepository.findById(id).orElse(null);
    }

    public void deleteBasketDevice(Long id) {
        basketDeviceRepository.deleteById(id);
    }

    // New method to get devices by basket id
    public List<BasketDevice> getDevicesByBasketId(Long basketId) {
        return basketDeviceRepository.findByBasketId(basketId);
    }
}
