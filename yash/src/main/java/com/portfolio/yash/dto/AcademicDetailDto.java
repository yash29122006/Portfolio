package com.portfolio.yash.dto;

import lombok.Data;

@Data
public class AcademicDetailDto {

    private Long id;
    private String institutionName;
    private String degree;
    private String grade;
    private Integer passingYear;
}