package com.example.SmartStore.service;

import com.example.SmartStore.model.Type;
import com.example.SmartStore.repository.TypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TypeService {

    @Autowired
    private TypeRepository typeRepository;

    public List<Type> getAllTypes() {
        return typeRepository.findAll();
    }

    public Type getTypeById(Long id) {
        return typeRepository.findById(id).orElse(null);
    }

    public Type saveType(Type type) {
        return typeRepository.save(type);
    }

    public void deleteType(Long id) {
        typeRepository.deleteById(id);
    }
}
