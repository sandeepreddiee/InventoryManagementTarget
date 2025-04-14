package com.target.inventory.controller;

import com.target.inventory.model.Inventory;
import com.target.inventory.service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import com.target.inventory.service.EmailService;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/inventory")
@CrossOrigin(origins = "*")
public class InventoryController {

    @Autowired
    private InventoryService inventoryService;

    @Autowired
    private EmailService emailService;

    @PostMapping("/api/reorder")
    public ResponseEntity<String> reorderProduct(@RequestBody Map<String, String> payload) {
        String product = payload.get("product");
        String email = payload.get("email");

        emailService.sendOrderConfirmation(email, product);
        return ResponseEntity.ok("Reorder email sent!");
    }

    @GetMapping
    public List<Inventory> getAllInventory() {
        return inventoryService.getAllInventory();
    }

    @GetMapping("/low-stock/{threshold}")
    public List<Inventory> getLowStockItems(@PathVariable int threshold) {
        return inventoryService.getLowStockItems(threshold);
    }

    @GetMapping("/{id}")
    public Optional<Inventory> getInventoryById(@PathVariable Long id) {
        return inventoryService.getInventoryById(id);
    }

    @PostMapping
    public Inventory createInventory(@RequestBody Inventory inventory) {
        return inventoryService.createInventory(inventory);
    }

    @DeleteMapping("/{id}")
    public void deleteInventory(@PathVariable Long id) {
        inventoryService.deleteInventory(id);
    }
}
