package com.ecommerce.product.config;

import com.ecommerce.product.model.Product;
import com.ecommerce.product.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {
    private final ProductRepository productRepository;

    @Override
    public void run(String... args) {
        productRepository.save(new Product("Wireless Headphones", "Premium noise-cancelling wireless headphones", new BigDecimal("199.99"), "/images/headphones.jpg", "Electronics", 50));
        productRepository.save(new Product("Smart Watch", "Fitness tracking smart watch with GPS", new BigDecimal("299.99"), "/images/smartwatch.jpg", "Electronics", 30));
        productRepository.save(new Product("Running Shoes", "Lightweight running shoes for athletes", new BigDecimal("89.99"), "/images/shoes.jpg", "Sports", 100));
        productRepository.save(new Product("Coffee Maker", "Automatic drip coffee maker with timer", new BigDecimal("49.99"), "/images/coffee.jpg", "Home", 75));
        productRepository.save(new Product("Yoga Mat", "Non-slip yoga mat with carrying strap", new BigDecimal("29.99"), "/images/yogamat.jpg", "Sports", 200));
        productRepository.save(new Product("Bluetooth Speaker", "Portable waterproof bluetooth speaker", new BigDecimal("79.99"), "/images/speaker.jpg", "Electronics", 60));
        productRepository.save(new Product("Desk Lamp", "LED desk lamp with adjustable brightness", new BigDecimal("39.99"), "/images/lamp.jpg", "Home", 150));
        productRepository.save(new Product("Backpack", "Water-resistant travel backpack 40L", new BigDecimal("59.99"), "/images/backpack.jpg", "Sports", 80));

        System.out.println("Sample products loaded!");
    }
}