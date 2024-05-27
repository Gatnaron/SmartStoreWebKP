package com.example.SmartStore.controller;

import com.example.SmartStore.model.Type;
import com.example.SmartStore.service.TypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/types")
public class TypeController {

    @Autowired
    private TypeService typeService;

    @GetMapping
    public List<Type> getAllTypes() {
        return typeService.getAllTypes();
    }

    @GetMapping("/{id}")
    public Type getTypeById(@PathVariable Long id) {
        return typeService.getTypeById(id);
    }

    @PostMapping
    public Type createType(@RequestBody Type type) {
        return typeService.saveType(type);
    }

    @DeleteMapping("/{id}")
    public void deleteType(@PathVariable Long id) {
        typeService.deleteType(id);
    }
}
