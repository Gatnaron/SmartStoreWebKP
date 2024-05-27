package com.example.SmartStore.service;

import com.example.SmartStore.model.Basket;
import com.example.SmartStore.model.BasketDevice;
import com.example.SmartStore.model.Device;
import com.example.SmartStore.repository.BasketDeviceRepository;
import com.example.SmartStore.repository.BasketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BasketService {

    @Autowired
    private BasketRepository basketRepository;

    @Autowired
    private BasketDeviceRepository basketDeviceRepository;

    public void addItemToBasket(Long basketId, Long deviceId) {
        BasketDevice basketDevice = new BasketDevice();
        basketDevice.setBasket(new Basket(basketId));
        basketDevice.setDevice(new Device(deviceId));
        basketDeviceRepository.save(basketDevice);
    }

    public List<Basket> getAllBaskets() {
        return basketRepository.findAll();
    }

    public Basket getBasketById(Long id) {
        return basketRepository.findById(id).orElse(null);
    }

    public Basket getBasketByUserId(Long userId) {
        return basketRepository.findByUserId(userId);
    }

    public Basket saveBasket(Basket basket) {
        return basketRepository.save(basket);
    }

    public void deleteBasket(Long id) {
        basketRepository.deleteById(id);
    }

    public List<BasketDevice> getBasketDevices(Long basketId) {
        return basketDeviceRepository.findByBasketId(basketId);
    }

    public BasketDevice addBasketDevice(BasketDevice basketDevice) {
        return basketDeviceRepository.save(basketDevice);
    }

    public void removeBasketDevice(Long basketId, Long deviceId) {
        BasketDevice basketDevice = basketDeviceRepository.findByBasketIdAndDeviceId(basketId, deviceId);
        if (basketDevice != null) {
            basketDeviceRepository.delete(basketDevice);
        }
    }

    public void buyAllItems(Long basketId) {
        List<BasketDevice> basketDevices = basketDeviceRepository.findByBasketId(basketId);
        basketDeviceRepository.deleteAll(basketDevices);
    }
}
