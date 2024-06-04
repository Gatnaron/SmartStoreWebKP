package com.example.SmartStore.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "basket_item")
public class BasketItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "basket_id")
    @JsonIgnore
    private Basket basket;

    @ManyToOne
    @JoinColumn(name = "device_id")
    @JsonIgnore
    private Device device;

    // Дополнительные поля, например, количество товаров
    private int quantity;

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

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public BasketItem() {
    }

    public BasketItem(Long id) {
        this.id = id;
    }
}
