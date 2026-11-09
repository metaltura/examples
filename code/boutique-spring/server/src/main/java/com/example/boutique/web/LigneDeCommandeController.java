package com.example.boutique.web;

import com.example.boutique.dto.LigneDeCommandeDto;
import com.example.boutique.dto.LigneDeCommandeInputDto;
import com.example.boutique.service.LigneDeCommandeService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/lignedecommandes")
public class LigneDeCommandeController {

    private final LigneDeCommandeService ligneDeCommandeService;

    public LigneDeCommandeController(LigneDeCommandeService ligneDeCommandeService) {
        this.ligneDeCommandeService = ligneDeCommandeService;
    }

    @GetMapping
    public List<LigneDeCommandeDto> list() {
        return ligneDeCommandeService.list();
    }

    @GetMapping("/{id}")
    public ResponseEntity<LigneDeCommandeDto> get(@PathVariable("id") String id) {
        return ResponseEntity.of(ligneDeCommandeService.get(id));
    }

    @PostMapping
    public ResponseEntity<LigneDeCommandeDto> create(@RequestBody @Valid LigneDeCommandeInputDto input) {
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(ligneDeCommandeService.create(input));
    }

    @PutMapping("/{id}")
    public ResponseEntity<LigneDeCommandeDto> update(
            @PathVariable("id") String id,
            @RequestBody @Valid LigneDeCommandeInputDto input) {
        return ResponseEntity.of(ligneDeCommandeService.update(id, input));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") String id) {
        return ligneDeCommandeService.delete(id)
            ? ResponseEntity.noContent().build()
            : ResponseEntity.notFound().build();
    }
}
