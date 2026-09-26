package com.portfolio.yash.dto;

import lombok.Data;

@Data
public class AchievementDto {

    private Long id;
    private String heading;
    private String description;
    private Boolean featured;
}