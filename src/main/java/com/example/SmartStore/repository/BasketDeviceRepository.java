package com.example.SmartStore.repository;

import com.example.SmartStore.model.BasketDevice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BasketDeviceRepository extends JpaRepository<BasketDevice, Long> {
    List<BasketDevice> findByBasketId(Long basketId);
    BasketDevice findByBasketIdAndDeviceId(Long basketId, Long deviceId);
}
