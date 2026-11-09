package com.example.boutique.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.time.Instant;

public record CommandeInputDto(
    Double total,
    @NotNull Instant date,
    @NotEmpty String numero,
    @NotEmpty String clientId
) {
}
