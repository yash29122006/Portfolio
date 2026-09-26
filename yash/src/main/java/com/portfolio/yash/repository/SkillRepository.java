package com.portfolio.yash.repository;

import com.portfolio.yash.entity.Skill;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SkillRepository extends JpaRepository<Skill, Long> {

    List<Skill> findByCategory(String category);
}