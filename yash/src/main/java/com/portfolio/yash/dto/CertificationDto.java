package com.portfolio.yash.dto;

import lombok.Data;

@Data
public class CertificationDto {

    private Long id;
    private String name;
    private String issuingAuthority;
    private String skillsLearned;
    private Boolean featured;
}