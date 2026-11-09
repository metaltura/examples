package com.example.boutique.dto;

import jakarta.validation.constraints.NotEmpty;

public record DocumentInputDto(
    @NotEmpty String numero
) {
}
