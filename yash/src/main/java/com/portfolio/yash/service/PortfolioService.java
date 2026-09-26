package com.portfolio.yash.service;

import com.portfolio.yash.dto.PortfolioDto;
import com.portfolio.yash.entity.Portfolio;
import com.portfolio.yash.repository.PortfolioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PortfolioService {

    private final PortfolioRepository portfolioRepository;

    public PortfolioDto getPortfolio() {
        Portfolio portfolio = portfolioRepository.findAll()
                .stream()
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Portfolio details not found"));

        return toDto(portfolio);
    }

    public PortfolioDto updatePortfolio(PortfolioDto dto) {
        Portfolio portfolio = portfolioRepository.findAll()
                .stream()
                .findFirst()
                .orElseGet(Portfolio::new);

        portfolio.setName(dto.getName());
        portfolio.setSummary(dto.getSummary());

        return toDto(portfolioRepository.save(portfolio));
    }

    private PortfolioDto toDto(Portfolio portfolio) {
        PortfolioDto dto = new PortfolioDto();

        dto.setId(portfolio.getId());
        dto.setName(portfolio.getName());
        dto.setSummary(portfolio.getSummary());

        return dto;
    }
}