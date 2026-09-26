package com.portfolio.yash.service;

import com.portfolio.yash.dto.SocialLinksDto;
import com.portfolio.yash.entity.SocialLinks;
import com.portfolio.yash.repository.SocialLinksRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SocialLinksService {

    private final SocialLinksRepository repository;

    public SocialLinksDto get() {
        SocialLinks links = repository.findAll()
                .stream()
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Social links not found"));

        return toDto(links);
    }

    public SocialLinksDto update(SocialLinksDto dto) {
        SocialLinks links = repository.findAll()
                .stream()
                .findFirst()
                .orElseGet(SocialLinks::new);

        links.setGithubUrl(dto.getGithubUrl());
        links.setLinkedinUrl(dto.getLinkedinUrl());
        links.setLeetcodeUrl(dto.getLeetcodeUrl());
        links.setCodolioUrl(dto.getCodolioUrl());

        return toDto(repository.save(links));
    }

    private SocialLinksDto toDto(SocialLinks links) {
        SocialLinksDto dto = new SocialLinksDto();

        dto.setId(links.getId());
        dto.setGithubUrl(links.getGithubUrl());
        dto.setLinkedinUrl(links.getLinkedinUrl());
        dto.setLeetcodeUrl(links.getLeetcodeUrl());
        dto.setCodolioUrl(links.getCodolioUrl());

        return dto;
    }
}