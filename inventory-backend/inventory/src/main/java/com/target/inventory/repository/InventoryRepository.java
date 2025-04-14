package com.target.inventory.repository;

import com.target.inventory.model.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InventoryRepository extends JpaRepository<Inventory, Long> {
    List<Inventory> findByQuantityAvailableLessThanEqual(int threshold);
}
