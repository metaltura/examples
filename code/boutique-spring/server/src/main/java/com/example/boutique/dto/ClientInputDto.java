package com.example.boutique.dto;

import jakarta.validation.constraints.NotEmpty;
import java.util.List;

public record ClientInputDto(
    @NotEmpty String nom,
    List<String> courriels,
    @NotEmpty String state
) {
}
