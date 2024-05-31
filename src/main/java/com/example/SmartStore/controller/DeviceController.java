package com.example.SmartStore.controller;

import com.example.SmartStore.model.Device;
import com.example.SmartStore.repository.DeviceRepository;
import com.example.SmartStore.service.DeviceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/devices")
public class DeviceController {

    @Autowired
    private DeviceService deviceService;

    @Autowired
    private DeviceRepository deviceRepository;

    @GetMapping
    public List<Device> getDevicesByIds(@RequestParam List<Long> ids) {
        return deviceRepository.findAllById(ids);
    }

    @GetMapping("/all")
    public List<Device> getAllDevices() {
        return deviceService.getAllDevices();
    }

    @PostMapping
    public Device createDevice(@RequestBody Device device) {
        return deviceService.saveDevice(device);
    }

    @GetMapping("/{id}")
    public Device getDeviceById(@PathVariable Long id) {
        return deviceService.getDeviceById(id);
    }

    @PutMapping("/{id}")
    public Device updateDevice(@PathVariable Long id, @RequestBody Device updatedDevice) {
        Device existingDevice = deviceService.getDeviceById(id);
        if (existingDevice != null) {
            existingDevice.setName(updatedDevice.getName());
            existingDevice.setDescription(updatedDevice.getDescription()); // установка описания
            existingDevice.setPrice(updatedDevice.getPrice());
            existingDevice.setImg(updatedDevice.getImg());
            return deviceService.saveDevice(existingDevice);
        } else {
            return null;
        }
    }

    @DeleteMapping("/{id}")
    public void deleteDevice(@PathVariable Long id) {
        deviceService.deleteDevice(id);
    }
}
