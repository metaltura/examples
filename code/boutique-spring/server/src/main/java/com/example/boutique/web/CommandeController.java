package com.example.boutique.web;

import com.example.boutique.dto.CommandeDto;
import com.example.boutique.dto.CommandeInputDto;
import com.example.boutique.service.CommandeService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/commandes")
public class CommandeController {

    private final CommandeService commandeService;

    public CommandeController(CommandeService commandeService) {
        this.commandeService = commandeService;
    }

    @GetMapping
    public List<CommandeDto> list() {
        return commandeService.list();
    }

    @GetMapping("/{id}")
    public ResponseEntity<CommandeDto> get(@PathVariable("id") String id) {
        return ResponseEntity.of(commandeService.get(id));
    }

    @PostMapping
    public ResponseEntity<CommandeDto> create(@RequestBody @Valid CommandeInputDto input) {
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(commandeService.create(input));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CommandeDto> update(
            @PathVariable("id") String id,
            @RequestBody @Valid CommandeInputDto input) {
        return ResponseEntity.of(commandeService.update(id, input));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") String id) {
        return commandeService.delete(id)
            ? ResponseEntity.noContent().build()
            : ResponseEntity.notFound().build();
    }
}
