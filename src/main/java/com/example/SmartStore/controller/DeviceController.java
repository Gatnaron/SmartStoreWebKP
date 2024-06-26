package com.example.SmartStore.controller;

import com.example.SmartStore.configuration.ResourceNotFoundException;
import com.example.SmartStore.model.Device;
import com.example.SmartStore.repository.DeviceRepository;
import com.example.SmartStore.service.DeviceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/devices")
public class DeviceController {

    @Autowired
    private DeviceService deviceService;

    @Autowired
    private DeviceRepository deviceRepository;

    @GetMapping
    public List<Device> getAllDevicesAdmin() {
        return deviceRepository.findAll();
    }

    @PostMapping("/add")
    public ResponseEntity<Device> addDevice(@RequestBody Device device) {
        Device savedDevice = deviceService.save(device);
        return ResponseEntity.ok(savedDevice);
    }

    @GetMapping("/all")
    public List<Device> getAllDevices() {
        return deviceService.getAllDevices();
    }

    @GetMapping("/{id}")
    public Device findById(@PathVariable Long id) {
        return deviceService.findById(id);
    }

//    @GetMapping("/{id}")
//    public Device getDeviceById(@PathVariable Long id) {
//        return deviceService.getDeviceById(id);
//    }

    @PutMapping("/{id}")
    public Device updateDevice(@PathVariable Long id, @RequestBody Device device) {
        return deviceService.update(id, device);
    }

    @DeleteMapping("/{id}")
    public Map<String, Boolean> deleteDevice(@PathVariable Long id) {
        Device device = deviceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Device not found for this id :: " + id));
        deviceRepository.delete(device);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
}
