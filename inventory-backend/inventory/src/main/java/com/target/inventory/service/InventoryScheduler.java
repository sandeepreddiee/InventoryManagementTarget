package com.target.inventory.service;

import com.target.inventory.model.Product;
import com.target.inventory.model.Sales;
import com.target.inventory.model.Store;
import com.target.inventory.repository.ProductRepository;
import com.target.inventory.repository.SalesRepository;
import com.target.inventory.repository.StoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;
import java.util.Random;

@Component
public class InventoryScheduler {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private SalesRepository salesRepository;

    private final Random random = new Random();

    @Autowired
    private StoreRepository storeRepository;

    @Scheduled(fixedRate = 5000)
    public void updateInventory() {
        List<Product> products = productRepository.findAll();
        List<Store> stores = storeRepository.findAll(); 

        for (Product product : products) {
            int currentQty = product.getQuantity();
            boolean shouldIncrease = random.nextBoolean();
            int updatedQty = shouldIncrease ? currentQty + 1 : currentQty - 1;

            if (updatedQty < 0) updatedQty = 0;

            if (updatedQty < currentQty) {
                int quantitySold = currentQty - updatedQty;

                Sales sale = new Sales();
                sale.setProduct(product);
                sale.setQuantitySold(quantitySold);
                sale.setSaleDate(LocalDate.now());
                sale.setTotalPrice(product.getPrice() * quantitySold);

                // 🔀 Assign a random store from existing ones
                if (!stores.isEmpty()) {
                    Store randomStore = stores.get(random.nextInt(stores.size()));
                    sale.setStore(randomStore);
                }

                salesRepository.save(sale);
            }

            product.setQuantity(updatedQty);
            productRepository.save(product);
        }
    }

}
