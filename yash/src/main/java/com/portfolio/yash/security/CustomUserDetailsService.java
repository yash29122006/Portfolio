package com.portfolio.yash.security;

import com.portfolio.yash.entity.Admin;
import com.portfolio.yash.repository.AdminRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final AdminRepository adminRepository;

    @Override
    public UserDetails loadUserByUsername(String username) {

        Admin admin = adminRepository.findByUsername(username)
                .orElseThrow(() ->
                        new RuntimeException("Admin not found"));

        return new User(
                admin.getUsername(),
                admin.getPassword(),
                List.of(
                        new SimpleGrantedAuthority(
                                "ROLE_" + admin.getRole()
                        )
                )
        );
    }
}