package com.portfolio.yash.service;

import com.portfolio.yash.dto.AchievementDto;
import com.portfolio.yash.entity.Achievement;
import com.portfolio.yash.repository.AchievementRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AchievementService {

    private final AchievementRepository repository;

    public List<AchievementDto> getAll() {
        return repository.findAll()
                .stream()
                .map(this::toDto)
                .toList();
    }

    public List<AchievementDto> getFeatured() {
        return repository.findByFeaturedTrueOrderByCreatedAtDesc()
                .stream()
                .limit(3)
                .map(this::toDto)
                .toList();
    }

    public AchievementDto create(AchievementDto dto) {
        Achievement achievement = new Achievement();

        achievement.setHeading(dto.getHeading());
        achievement.setDescription(dto.getDescription());
        achievement.setFeatured(Boolean.TRUE.equals(dto.getFeatured()));

        return toDto(repository.save(achievement));
    }

    public AchievementDto update(Long id, AchievementDto dto) {
        Achievement achievement = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Achievement not found"));

        achievement.setHeading(dto.getHeading());
        achievement.setDescription(dto.getDescription());
        achievement.setFeatured(Boolean.TRUE.equals(dto.getFeatured()));

        return toDto(repository.save(achievement));
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    private AchievementDto toDto(Achievement achievement) {
        AchievementDto dto = new AchievementDto();

        dto.setId(achievement.getId());
        dto.setHeading(achievement.getHeading());
        dto.setDescription(achievement.getDescription());
        dto.setFeatured(achievement.getFeatured());

        return dto;
    }
}