package com.portfolio.yash.controller;

import com.portfolio.yash.dto.*;
import com.portfolio.yash.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/public")
@RequiredArgsConstructor
public class PublicController {

    private final PortfolioService portfolioService;
    private final AcademicDetailService academicDetailService;
    private final ProjectService projectService;
    private final SkillService skillService;
    private final AchievementService achievementService;
    private final CertificationService certificationService;
    private final ExperienceService experienceService;
    private final SocialLinksService socialLinksService;

    // =========================
    // PORTFOLIO / ABOUT
    // =========================

    @GetMapping("/portfolio")
    public PortfolioDto getPortfolio() {
        return portfolioService.getPortfolio();
    }

    // =========================
    // ACADEMIC DETAILS
    // =========================

    @GetMapping("/academics")
    public List<AcademicDetailDto> getAcademics() {
        return academicDetailService.getAll();
    }

    // =========================
    // PROJECTS
    // =========================

    @GetMapping("/projects")
    public List<ProjectDto> getProjects() {
        return projectService.getAll();
    }

    @GetMapping("/projects/featured")
    public List<ProjectDto> getFeaturedProjects() {
        return projectService.getFeatured();
    }

    // =========================
    // SKILLS
    // =========================

    @GetMapping("/skills")
    public List<SkillDto> getSkills() {
        return skillService.getAll();
    }

    // =========================
    // ACHIEVEMENTS
    // =========================

    @GetMapping("/achievements")
    public List<AchievementDto> getAchievements() {
        return achievementService.getAll();
    }

    @GetMapping("/achievements/featured")
    public List<AchievementDto> getFeaturedAchievements() {
        return achievementService.getFeatured();
    }

    // =========================
    // CERTIFICATIONS
    // =========================

    @GetMapping("/certifications")
    public List<CertificationDto> getCertifications() {
        return certificationService.getAll();
    }

    @GetMapping("/certifications/featured")
    public List<CertificationDto> getFeaturedCertifications() {
        return certificationService.getFeatured();
    }

    // =========================
    // EXPERIENCE
    // =========================

    @GetMapping("/experience")
    public List<ExperienceDto> getExperience() {
        return experienceService.getAll();
    }

    // =========================
    // SOCIAL LINKS
    // =========================

    @GetMapping("/social-links")
    public SocialLinksDto getSocialLinks() {
        return socialLinksService.get();
    }
}