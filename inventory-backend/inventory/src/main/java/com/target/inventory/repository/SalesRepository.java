package com.target.inventory.repository;

import com.target.inventory.model.Sales;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface SalesRepository extends JpaRepository<Sales, Long> {
    List<Sales> findBySaleDateBetween(LocalDate start, LocalDate end);
}
