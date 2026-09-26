package com.portfolio.yash.controller;

import com.portfolio.yash.dto.*;
import com.portfolio.yash.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final PortfolioService portfolioService;
    private final AcademicDetailService academicDetailService;
    private final ProjectService projectService;
    private final SkillService skillService;
    private final AchievementService achievementService;
    private final CertificationService certificationService;
    private final ExperienceService experienceService;
    private final SocialLinksService socialLinksService;
    private final ContactMessageService contactMessageService;


    // =========================================================
    // PORTFOLIO / ABOUT
    // =========================================================

    @GetMapping("/portfolio")
    public PortfolioDto getPortfolio() {
        return portfolioService.getPortfolio();
    }

    @PutMapping("/portfolio")
    public PortfolioDto updatePortfolio(
            @RequestBody PortfolioDto dto) {
        return portfolioService.updatePortfolio(dto);
    }


    // =========================================================
    // ACADEMIC DETAILS
    // =========================================================

    @GetMapping("/academics")
    public List<AcademicDetailDto> getAcademics() {
        return academicDetailService.getAll();
    }

    @PostMapping("/academics")
    public ResponseEntity<AcademicDetailDto> createAcademic(
            @RequestBody AcademicDetailDto dto) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(academicDetailService.create(dto));
    }

    @PutMapping("/academics/{id}")
    public AcademicDetailDto updateAcademic(
            @PathVariable Long id,
            @RequestBody AcademicDetailDto dto) {

        return academicDetailService.update(id, dto);
    }

    @DeleteMapping("/academics/{id}")
    public ResponseEntity<Void> deleteAcademic(
            @PathVariable Long id) {

        academicDetailService.delete(id);
        return ResponseEntity.noContent().build();
    }


    // =========================================================
    // PROJECTS
    // =========================================================

    @GetMapping("/projects")
    public List<ProjectDto> getProjects() {
        return projectService.getAll();
    }

    @PostMapping("/projects")
    public ResponseEntity<ProjectDto> createProject(
            @RequestBody ProjectDto dto) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(projectService.create(dto));
    }

    @PutMapping("/projects/{id}")
    public ProjectDto updateProject(
            @PathVariable Long id,
            @RequestBody ProjectDto dto) {

        return projectService.update(id, dto);
    }

    @DeleteMapping("/projects/{id}")
    public ResponseEntity<Void> deleteProject(
            @PathVariable Long id) {

        projectService.delete(id);
        return ResponseEntity.noContent().build();
    }


    // =========================================================
    // SKILLS
    // =========================================================

    @GetMapping("/skills")
    public List<SkillDto> getSkills() {
        return skillService.getAll();
    }

    @PostMapping("/skills")
    public ResponseEntity<SkillDto> createSkill(
            @RequestBody SkillDto dto) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(skillService.create(dto));
    }

    @PutMapping("/skills/{id}")
    public SkillDto updateSkill(
            @PathVariable Long id,
            @RequestBody SkillDto dto) {

        return skillService.update(id, dto);
    }

    @DeleteMapping("/skills/{id}")
    public ResponseEntity<Void> deleteSkill(
            @PathVariable Long id) {

        skillService.delete(id);
        return ResponseEntity.noContent().build();
    }


    // =========================================================
    // ACHIEVEMENTS
    // =========================================================

    @GetMapping("/achievements")
    public List<AchievementDto> getAchievements() {
        return achievementService.getAll();
    }

    @PostMapping("/achievements")
    public ResponseEntity<AchievementDto> createAchievement(
            @RequestBody AchievementDto dto) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(achievementService.create(dto));
    }

    @PutMapping("/achievements/{id}")
    public AchievementDto updateAchievement(
            @PathVariable Long id,
            @RequestBody AchievementDto dto) {

        return achievementService.update(id, dto);
    }

    @DeleteMapping("/achievements/{id}")
    public ResponseEntity<Void> deleteAchievement(
            @PathVariable Long id) {

        achievementService.delete(id);
        return ResponseEntity.noContent().build();
    }


    // =========================================================
    // CERTIFICATIONS
    // =========================================================

    @GetMapping("/certifications")
    public List<CertificationDto> getCertifications() {
        return certificationService.getAll();
    }

    @PostMapping("/certifications")
    public ResponseEntity<CertificationDto> createCertification(
            @RequestBody CertificationDto dto) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(certificationService.create(dto));
    }

    @PutMapping("/certifications/{id}")
    public CertificationDto updateCertification(
            @PathVariable Long id,
            @RequestBody CertificationDto dto) {

        return certificationService.update(id, dto);
    }

    @DeleteMapping("/certifications/{id}")
    public ResponseEntity<Void> deleteCertification(
            @PathVariable Long id) {

        certificationService.delete(id);
        return ResponseEntity.noContent().build();
    }


    // =========================================================
    // EXPERIENCE
    // =========================================================

    @GetMapping("/experience")
    public List<ExperienceDto> getExperience() {
        return experienceService.getAll();
    }

    @PostMapping("/experience")
    public ResponseEntity<ExperienceDto> createExperience(
            @RequestBody ExperienceDto dto) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(experienceService.create(dto));
    }

    @PutMapping("/experience/{id}")
    public ExperienceDto updateExperience(
            @PathVariable Long id,
            @RequestBody ExperienceDto dto) {

        return experienceService.update(id, dto);
    }

    @DeleteMapping("/experience/{id}")
    public ResponseEntity<Void> deleteExperience(
            @PathVariable Long id) {

        experienceService.delete(id);
        return ResponseEntity.noContent().build();
    }


    // =========================================================
    // SOCIAL LINKS
    // =========================================================

    @GetMapping("/social-links")
    public SocialLinksDto getSocialLinks() {
        return socialLinksService.get();
    }

    @PutMapping("/social-links")
    public SocialLinksDto updateSocialLinks(
            @RequestBody SocialLinksDto dto) {

        return socialLinksService.update(dto);
    }


    // =========================================================
    // CONTACT MESSAGES
    // =========================================================

    @GetMapping("/messages")
    public List<ContactMessageDto> getMessages() {
        return contactMessageService.getAll();
    }

    @DeleteMapping("/messages/{id}")
    public ResponseEntity<Void> deleteMessage(
            @PathVariable Long id) {

        contactMessageService.delete(id);
        return ResponseEntity.noContent().build();
    }
}