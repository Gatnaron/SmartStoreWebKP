package com.example.SmartStore.service;

import com.example.SmartStore.model.Brand;
import com.example.SmartStore.model.Device;
import com.example.SmartStore.model.Type;
import com.example.SmartStore.repository.BrandRepository;
import com.example.SmartStore.repository.DeviceRepository;
import com.example.SmartStore.repository.TypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DeviceService {

    @Autowired
    private DeviceRepository deviceRepository;

    @Autowired
    private BrandRepository brandRepository;

    @Autowired
    private TypeRepository typeRepository;

    public List<Device> getAllDevices() {
        return deviceRepository.findAll();
    }

    public Device getDeviceById(Long id) {
        return deviceRepository.findById(id).orElse(null);
    }

    public Device findById(Long id) {
        return deviceRepository.findById(id).orElseThrow(() -> new RuntimeException("Device not found"));
    }

    public Device save(Device device) {
        Brand brand = brandRepository.findById(device.getBrand().getId())
                .orElseThrow(() -> new RuntimeException("Brand not found"));
        Type type = typeRepository.findById(device.getType().getId())
                .orElseThrow(() -> new RuntimeException("Type not found"));
        device.setBrand(brand);
        device.setType(type);
        return deviceRepository.save(device);
    }

    public Device update(Long id, Device device) {
        Device existingDevice = deviceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Device not found"));
        existingDevice.setName(device.getName());
        existingDevice.setImg(device.getImg());
        existingDevice.setPrice(device.getPrice());
        existingDevice.setType(device.getType());
        existingDevice.setBrand(device.getBrand());
        return deviceRepository.save(existingDevice);
    }

    public void deleteDevice(Long id) {
        deviceRepository.deleteById(id);
    }
}
