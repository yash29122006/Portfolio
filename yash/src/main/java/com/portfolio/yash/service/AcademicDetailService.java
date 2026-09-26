package com.portfolio.yash.service;

import com.portfolio.yash.dto.AcademicDetailDto;
import com.portfolio.yash.entity.AcademicDetail;
import com.portfolio.yash.repository.AcademicDetailRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AcademicDetailService {

    private final AcademicDetailRepository repository;

    public List<AcademicDetailDto> getAll() {
        return repository.findAll()
                .stream()
                .map(this::toDto)
                .toList();
    }

    public AcademicDetailDto create(AcademicDetailDto dto) {
        AcademicDetail academic = new AcademicDetail();

        academic.setInstitutionName(dto.getInstitutionName());
        academic.setDegree(dto.getDegree());
        academic.setGrade(dto.getGrade());
        academic.setPassingYear(dto.getPassingYear());

        return toDto(repository.save(academic));
    }

    public AcademicDetailDto update(Long id, AcademicDetailDto dto) {
        AcademicDetail academic = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Academic detail not found"));

        academic.setInstitutionName(dto.getInstitutionName());
        academic.setDegree(dto.getDegree());
        academic.setGrade(dto.getGrade());
        academic.setPassingYear(dto.getPassingYear());

        return toDto(repository.save(academic));
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    private AcademicDetailDto toDto(AcademicDetail academic) {
        AcademicDetailDto dto = new AcademicDetailDto();

        dto.setId(academic.getId());
        dto.setInstitutionName(academic.getInstitutionName());
        dto.setDegree(academic.getDegree());
        dto.setGrade(academic.getGrade());
        dto.setPassingYear(academic.getPassingYear());

        return dto;
    }
}