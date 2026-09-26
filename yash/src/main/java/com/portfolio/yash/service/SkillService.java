package com.portfolio.yash.service;

import com.portfolio.yash.dto.SkillDto;
import com.portfolio.yash.entity.Skill;
import com.portfolio.yash.repository.SkillRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SkillService {

    private final SkillRepository repository;

    public List<SkillDto> getAll() {
        return repository.findAll()
                .stream()
                .map(this::toDto)
                .toList();
    }

    public SkillDto create(SkillDto dto) {
        Skill skill = new Skill();

        skill.setName(dto.getName());
        skill.setCategory(dto.getCategory());

        return toDto(repository.save(skill));
    }

    public SkillDto update(Long id, SkillDto dto) {
        Skill skill = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Skill not found"));

        skill.setName(dto.getName());
        skill.setCategory(dto.getCategory());

        return toDto(repository.save(skill));
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    private SkillDto toDto(Skill skill) {
        SkillDto dto = new SkillDto();

        dto.setId(skill.getId());
        dto.setName(skill.getName());
        dto.setCategory(skill.getCategory());

        return dto;
    }
}