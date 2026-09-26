package com.portfolio.yash.repository;

import com.portfolio.yash.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {

    List<Project> findByFeaturedTrue();

    List<Project> findByFeaturedTrueOrderByCreatedAtDesc();
}