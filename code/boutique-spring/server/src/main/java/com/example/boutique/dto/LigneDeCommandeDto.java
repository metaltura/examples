package com.example.boutique.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record LigneDeCommandeDto(
    @NotEmpty String id,
    @NotNull Double quantite,
    @NotEmpty String commandeId
) {
}
