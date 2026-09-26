package com.portfolio.yash.service;

import com.portfolio.yash.dto.ExperienceDto;
import com.portfolio.yash.entity.Experience;
import com.portfolio.yash.repository.ExperienceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ExperienceService {

    private final ExperienceRepository repository;

    public List<ExperienceDto> getAll() {
        return repository.findAll()
                .stream()
                .map(this::toDto)
                .toList();
    }

    public ExperienceDto create(ExperienceDto dto) {
        Experience experience = new Experience();

        experience.setCompanyName(dto.getCompanyName());
        experience.setRole(dto.getRole());
        experience.setContribution(dto.getContribution());

        return toDto(repository.save(experience));
    }

    public ExperienceDto update(Long id, ExperienceDto dto) {
        Experience experience = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Experience not found"));

        experience.setCompanyName(dto.getCompanyName());
        experience.setRole(dto.getRole());
        experience.setContribution(dto.getContribution());

        return toDto(repository.save(experience));
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    private ExperienceDto toDto(Experience experience) {
        ExperienceDto dto = new ExperienceDto();

        dto.setId(experience.getId());
        dto.setCompanyName(experience.getCompanyName());
        dto.setRole(experience.getRole());
        dto.setContribution(experience.getContribution());

        return dto;
    }
}