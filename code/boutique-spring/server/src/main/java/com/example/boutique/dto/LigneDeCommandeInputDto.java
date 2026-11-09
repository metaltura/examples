package com.example.boutique.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record LigneDeCommandeInputDto(
    @NotNull Double quantite,
    @NotEmpty String commandeId
) {
}
