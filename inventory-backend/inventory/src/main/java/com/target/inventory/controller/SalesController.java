package com.target.inventory.controller;

import com.target.inventory.model.Sales;
import com.target.inventory.service.SalesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/sales")
@CrossOrigin(origins = "*")
public class SalesController {

    @Autowired
    private SalesService salesService;

    @GetMapping
    public List<Sales> getAllSales() {
        return salesService.getAllSales();
    }

    @GetMapping("/{id}")
    public Optional<Sales> getSaleById(@PathVariable Long id) {
        return salesService.getSaleById(id);
    }

    @GetMapping("/range")
    public List<Sales> getSalesByDateRange(
            @RequestParam("start") String start,
            @RequestParam("end") String end
    ) {
        return salesService.getSalesByDateRange(LocalDate.parse(start), LocalDate.parse(end));
    }

    @PostMapping
    public Sales createSale(@RequestBody Sales sale) {
        return salesService.createSale(sale);
    }

    @DeleteMapping("/{id}")
    public void deleteSale(@PathVariable Long id) {
        salesService.deleteSale(id);
    }
}
