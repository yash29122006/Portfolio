package com.portfolio.yash.repository;

import com.portfolio.yash.entity.Certification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CertificationRepository extends JpaRepository<Certification, Long> {

    List<Certification> findByFeaturedTrue();

    List<Certification> findByFeaturedTrueOrderByCreatedAtDesc();
}