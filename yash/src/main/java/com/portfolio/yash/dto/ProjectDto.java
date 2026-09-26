package com.portfolio.yash.dto;

import lombok.Data;

@Data
public class ProjectDto {

    private Long id;
    private String name;
    private String techStack;
    private String description;
    private String githubLink;
    private String liveLink;
    private Boolean featured;
}