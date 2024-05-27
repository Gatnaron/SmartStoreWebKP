package com.example.SmartStore.repository;

import com.example.SmartStore.model.DeviceInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeviceInfoRepository extends JpaRepository<DeviceInfo, Long> {
}
