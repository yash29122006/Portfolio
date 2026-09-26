package com.portfolio.yash.service;

import com.portfolio.yash.dto.CertificationDto;
import com.portfolio.yash.entity.Certification;
import com.portfolio.yash.repository.CertificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CertificationService {

    private final CertificationRepository repository;

    public List<CertificationDto> getAll() {
        return repository.findAll()
                .stream()
                .map(this::toDto)
                .toList();
    }

    public List<CertificationDto> getFeatured() {
        return repository.findByFeaturedTrueOrderByCreatedAtDesc()
                .stream()
                .limit(3)
                .map(this::toDto)
                .toList();
    }

    public CertificationDto create(CertificationDto dto) {
        Certification certification = new Certification();

        certification.setName(dto.getName());
        certification.setIssuingAuthority(dto.getIssuingAuthority());
        certification.setSkillsLearned(dto.getSkillsLearned());
        certification.setFeatured(Boolean.TRUE.equals(dto.getFeatured()));

        return toDto(repository.save(certification));
    }

    public CertificationDto update(Long id, CertificationDto dto) {
        Certification certification = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Certification not found"));

        certification.setName(dto.getName());
        certification.setIssuingAuthority(dto.getIssuingAuthority());
        certification.setSkillsLearned(dto.getSkillsLearned());
        certification.setFeatured(Boolean.TRUE.equals(dto.getFeatured()));

        return toDto(repository.save(certification));
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    private CertificationDto toDto(Certification certification) {
        CertificationDto dto = new CertificationDto();

        dto.setId(certification.getId());
        dto.setName(certification.getName());
        dto.setIssuingAuthority(certification.getIssuingAuthority());
        dto.setSkillsLearned(certification.getSkillsLearned());
        dto.setFeatured(certification.getFeatured());

        return dto;
    }
}