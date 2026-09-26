package com.portfolio.yash.repository;

import com.portfolio.yash.entity.Achievement;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AchievementRepository extends JpaRepository<Achievement, Long> {

    List<Achievement> findByFeaturedTrue();

    List<Achievement> findByFeaturedTrueOrderByCreatedAtDesc();
}