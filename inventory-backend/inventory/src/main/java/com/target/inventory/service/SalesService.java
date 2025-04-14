package com.target.inventory.service;

import com.target.inventory.model.Sales;
import com.target.inventory.repository.SalesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class SalesService {

    @Autowired
    private SalesRepository salesRepository;

    public List<Sales> getAllSales() {
        return salesRepository.findAll();
    }

    public Optional<Sales> getSaleById(Long id) {
        return salesRepository.findById(id);
    }

    public List<Sales> getSalesByDateRange(LocalDate start, LocalDate end) {
        return salesRepository.findBySaleDateBetween(start, end);
    }

    public Sales createSale(Sales sale) {
        return salesRepository.save(sale);
    }

    public void deleteSale(Long id) {
        salesRepository.deleteById(id);
    }
}
