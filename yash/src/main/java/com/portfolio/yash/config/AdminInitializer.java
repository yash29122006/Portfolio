package com.portfolio.yash.config;

import com.portfolio.yash.entity.Admin;
import com.portfolio.yash.repository.AdminRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AdminInitializer implements CommandLineRunner {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {

        if (adminRepository.findByUsername("admin").isEmpty()) {

            Admin admin = new Admin();

            admin.setUsername("admin");
            admin.setPassword(
                    passwordEncoder.encode("Admin@12345")
            );
            admin.setRole("ADMIN");

            adminRepository.save(admin);

            System.out.println("=================================");
            System.out.println("Admin account created");
            System.out.println("Username: Yash");
            System.out.println("Password: Ya@291206");
            System.out.println("=================================");
        }
    }
}