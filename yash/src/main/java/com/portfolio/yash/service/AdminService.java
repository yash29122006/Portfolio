package com.portfolio.yash.service;

import com.portfolio.yash.entity.Admin;
import com.portfolio.yash.repository.AdminRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;

    public Admin createAdmin(String username, String password) {

        if (adminRepository.findByUsername(username).isPresent()) {
            throw new RuntimeException("Admin username already exists");
        }

        Admin admin = new Admin();

        admin.setUsername(username);
        admin.setPassword(passwordEncoder.encode(password));
        admin.setRole("ADMIN");

        return adminRepository.save(admin);
    }
}