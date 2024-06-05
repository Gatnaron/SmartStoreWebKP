package com.example.SmartStore.model;

import jakarta.persistence.*;

@Entity
@Table(name = "device")
public class Device {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private double price;

    private String img;

    @ManyToOne
    @JoinColumn(name = "id_type", referencedColumnName = "id")
    private Type type;

    @ManyToOne
    @JoinColumn(name = "id_brand", referencedColumnName = "id")
    private Brand brand;

    // Конструктор по умолчанию
    public Device() {}

    // Конструктор с параметром id
    public Device(Long id) {
        this.id = id;
    }

    // Геттеры и сеттеры
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }


    public Type getType() {
        return type;
    }

    public void setType(Type type) {
        this.type = type;
    }

    public Brand getBrand() {
        return brand;
    }

    public void setBrand(Brand brand) {
        this.brand = brand;
    }
}
