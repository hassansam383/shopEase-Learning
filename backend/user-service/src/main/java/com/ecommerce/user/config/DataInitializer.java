package com.ecommerce.user.config;

import com.ecommerce.user.model.User;
import com.ecommerce.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {
    private final UserRepository userRepository;

    @Override
    public void run(String... args) {
        userRepository.save(new User("john@example.com", "John", "Doe", "password123", "555-1234", "123 Main St", User.UserRole.CUSTOMER));
        userRepository.save(new User("jane@example.com", "Jane", "Smith", "password123", "555-5678", "456 Oak Ave", User.UserRole.CUSTOMER));
        userRepository.save(new User("admin@example.com", "Admin", "User", "admin123", "555-0000", "789 Admin Blvd", User.UserRole.ADMIN));

        System.out.println("Sample users loaded!");
    }
}
