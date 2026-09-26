package com.portfolio.yash.service;

import com.portfolio.yash.dto.ProjectDto;
import com.portfolio.yash.entity.Project;
import com.portfolio.yash.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository repository;

    public List<ProjectDto> getAll() {
        return repository.findAll()
                .stream()
                .map(this::toDto)
                .toList();
    }

    public List<ProjectDto> getFeatured() {
        return repository.findByFeaturedTrueOrderByCreatedAtDesc()
                .stream()
                .limit(3)
                .map(this::toDto)
                .toList();
    }

    public ProjectDto create(ProjectDto dto) {
        Project project = new Project();

        project.setName(dto.getName());
        project.setTechStack(dto.getTechStack());
        project.setDescription(dto.getDescription());
        project.setGithubLink(dto.getGithubLink());
        project.setLiveLink(dto.getLiveLink());
        project.setFeatured(Boolean.TRUE.equals(dto.getFeatured()));

        return toDto(repository.save(project));
    }

    public ProjectDto update(Long id, ProjectDto dto) {
        Project project = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        project.setName(dto.getName());
        project.setTechStack(dto.getTechStack());
        project.setDescription(dto.getDescription());
        project.setGithubLink(dto.getGithubLink());
        project.setLiveLink(dto.getLiveLink());
        project.setFeatured(Boolean.TRUE.equals(dto.getFeatured()));

        return toDto(repository.save(project));
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    private ProjectDto toDto(Project project) {
        ProjectDto dto = new ProjectDto();

        dto.setId(project.getId());
        dto.setName(project.getName());
        dto.setTechStack(project.getTechStack());
        dto.setDescription(project.getDescription());
        dto.setGithubLink(project.getGithubLink());
        dto.setLiveLink(project.getLiveLink());
        dto.setFeatured(project.getFeatured());

        return dto;
    }
}