package com.example.boutique.web;

import com.example.boutique.dto.DocumentDto;
import com.example.boutique.dto.DocumentInputDto;
import com.example.boutique.service.DocumentService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/documents")
public class DocumentController {

    private final DocumentService documentService;

    public DocumentController(DocumentService documentService) {
        this.documentService = documentService;
    }

    @GetMapping
    public List<DocumentDto> list() {
        return documentService.list();
    }

    @GetMapping("/{id}")
    public ResponseEntity<DocumentDto> get(@PathVariable("id") String id) {
        return ResponseEntity.of(documentService.get(id));
    }

    @PostMapping
    public ResponseEntity<DocumentDto> create(@RequestBody @Valid DocumentInputDto input) {
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(documentService.create(input));
    }

    @PutMapping("/{id}")
    public ResponseEntity<DocumentDto> update(
            @PathVariable("id") String id,
            @RequestBody @Valid DocumentInputDto input) {
        return ResponseEntity.of(documentService.update(id, input));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") String id) {
        return documentService.delete(id)
            ? ResponseEntity.noContent().build()
            : ResponseEntity.notFound().build();
    }
}
