package com.example.boutique.dto;

import jakarta.validation.constraints.NotEmpty;
import java.util.List;

public record ClientDto(
    @NotEmpty String id,
    @NotEmpty String nom,
    List<String> courriels,
    @NotEmpty String state
) {
}
