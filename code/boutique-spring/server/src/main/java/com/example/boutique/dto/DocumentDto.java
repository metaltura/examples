package com.example.boutique.dto;

import jakarta.validation.constraints.NotEmpty;

public record DocumentDto(
    @NotEmpty String id,
    @NotEmpty String numero
) {
}
