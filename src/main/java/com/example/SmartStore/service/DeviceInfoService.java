package com.example.SmartStore.service;

import com.example.SmartStore.model.Device;
import com.example.SmartStore.model.DeviceInfo;
import com.example.SmartStore.repository.DeviceInfoRepository;
import com.example.SmartStore.repository.DeviceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DeviceInfoService {

    @Autowired
    private DeviceInfoRepository deviceInfoRepository;

    @Autowired
    private DeviceRepository deviceRepository;

    public List<DeviceInfo> getAllDeviceInfos() {
        return deviceInfoRepository.findAll();
    }

    public DeviceInfo getDeviceInfoById(Long id) {
        return deviceInfoRepository.findById(id).orElse(null);
    }

    public DeviceInfo saveDeviceInfo(DeviceInfo deviceInfo) {
        Device device = deviceRepository.findById(deviceInfo.getDevice().getId()).orElse(null);
        if (device != null) {
            deviceInfo.setDevice(device);
            return deviceInfoRepository.save(deviceInfo);
        } else {
            throw new IllegalArgumentException("Device with id " + deviceInfo.getDevice().getId() + " not found.");
        }
    }

    public void deleteDeviceInfo(Long id) {
        deviceInfoRepository.deleteById(id);
    }
}
