package com.example.boutique.web;

import com.example.boutique.dto.ClientDto;
import com.example.boutique.dto.ClientInputDto;
import com.example.boutique.service.ClientService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/clients")
public class ClientController {

    private final ClientService clientService;

    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    @GetMapping
    public List<ClientDto> list() {
        return clientService.list();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClientDto> get(@PathVariable("id") String id) {
        return ResponseEntity.of(clientService.get(id));
    }

    @PostMapping
    public ResponseEntity<ClientDto> create(@RequestBody @Valid ClientInputDto input) {
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(clientService.create(input));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ClientDto> update(
            @PathVariable("id") String id,
            @RequestBody @Valid ClientInputDto input) {
        return ResponseEntity.of(clientService.update(id, input));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") String id) {
        return clientService.delete(id)
            ? ResponseEntity.noContent().build()
            : ResponseEntity.notFound().build();
    }
}
