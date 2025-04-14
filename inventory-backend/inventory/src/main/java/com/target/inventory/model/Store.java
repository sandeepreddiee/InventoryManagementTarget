package com.target.inventory.model;

import jakarta.persistence.*;

@Entity
@Table(name = "store")
public class Store {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long store_id;

    private String name;

    private String location;

    // 🔧 Default no-args constructor (REQUIRED by Hibernate)
    public Store() {
    }

    // 🛠️ All-args constructor for manual creation
    public Store(Long store_id, String name, String location) {
        this.store_id = store_id;
        this.name = name;
        this.location = location;
    }

    // 🧩 Getters and Setters
    public Long getStore_id() {
        return store_id;
    }

    public void setStore_id(Long store_id) {
        this.store_id = store_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }
}
