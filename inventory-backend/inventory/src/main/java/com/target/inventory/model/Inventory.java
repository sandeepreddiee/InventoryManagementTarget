package com.target.inventory.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "inventory")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Inventory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long inventory_id;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToOne
    @JoinColumn(name = "store_id")
    private Store store;

    @Column(name = "quantity_available")
    private int quantityAvailable;

    @Column(name = "reorder_level")
    private int reorderLevel;

    @Column(name = "last_updated")
    private LocalDateTime lastUpdated = LocalDateTime.now();

}
