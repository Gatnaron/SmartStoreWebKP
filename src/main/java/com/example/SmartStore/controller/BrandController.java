package com.example.SmartStore.controller;

import com.example.SmartStore.model.Brand;
import com.example.SmartStore.service.BrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/brands")
public class BrandController {

    @Autowired
    private BrandService brandService;

    @GetMapping
    public List<Brand> getAllBrands() {
        return brandService.getAllBrands();
    }

    @GetMapping("/{id}")
    public Brand getBrandById(@PathVariable Long id) {
        return brandService.getBrandById(id);
    }

    @PostMapping
    public Brand createBrand(@RequestBody Brand brand) {
        return brandService.saveBrand(brand);
    }

    @DeleteMapping("/{id}")
    public void deleteBrand(@PathVariable Long id) {
        brandService.deleteBrand(id);
    }
}
