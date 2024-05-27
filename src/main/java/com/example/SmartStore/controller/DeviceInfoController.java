package com.example.SmartStore.controller;

import com.example.SmartStore.model.DeviceInfo;
import com.example.SmartStore.service.DeviceInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/device_infos")
public class DeviceInfoController {

    @Autowired
    private DeviceInfoService deviceInfoService;

    @GetMapping
    public List<DeviceInfo> getAllDeviceInfos() {
        return deviceInfoService.getAllDeviceInfos();
    }

    @GetMapping("/{id}")
    public DeviceInfo getDeviceInfoById(@PathVariable Long id) {
        return deviceInfoService.getDeviceInfoById(id);
    }

    @PostMapping
    public DeviceInfo createDeviceInfo(@RequestBody DeviceInfo deviceInfo) {
        return deviceInfoService.saveDeviceInfo(deviceInfo);
    }

    @DeleteMapping("/{id}")
    public void deleteDeviceInfo(@PathVariable Long id) {
        deviceInfoService.deleteDeviceInfo(id);
    }
}
