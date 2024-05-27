package com.example.SmartStore.model;

import jakarta.persistence.*;

@Entity
@Table(name = "basket_device")
public class BasketDevice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_basket", referencedColumnName = "id")
    private Basket basket;

    @ManyToOne
    @JoinColumn(name = "id_device", referencedColumnName = "id")
    private Device device;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Basket getBasket() {
        return basket;
    }

    public void setBasket(Basket basket) {
        this.basket = basket;
    }

    public Device getDevice() {
        return device;
    }

    public void setDevice(Device device) {
        this.device = device;
    }
}