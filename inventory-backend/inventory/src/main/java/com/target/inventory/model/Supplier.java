package com.target.inventory.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "suppliers")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Supplier {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long supplier_id;

    @Column(nullable = false)
    private String name;

    private String contact;

    @Column(nullable = false, unique = true)
    private String email;
}
