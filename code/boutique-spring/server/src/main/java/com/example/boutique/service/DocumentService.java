package com.example.boutique.service;

import com.example.boutique.dto.DocumentDto;
import com.example.boutique.dto.DocumentInputDto;
import com.example.boutique.entity.Document;
import com.example.boutique.repository.DocumentRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class DocumentService {

    private final DocumentRepository documentRepository;

    public DocumentService(
            DocumentRepository documentRepository
    ) {
        this.documentRepository = documentRepository;
    }

    public List<DocumentDto> list() {
        return documentRepository.findAll().stream().map(this::toDocumentDto).toList();
    }

    public Optional<DocumentDto> get(String id) {
        return documentRepository.findById(id).map(this::toDocumentDto);
    }

    public DocumentDto create(DocumentInputDto input) {
        Document entity = new Document();
        applyDocumentInputDto(entity, input);
        return toDocumentDto(documentRepository.save(entity));
    }

    public Optional<DocumentDto> update(String id, DocumentInputDto input) {
        return documentRepository.findById(id).map(entity -> {
            applyDocumentInputDto(entity, input);
            return toDocumentDto(documentRepository.save(entity));
        });
    }

    public boolean delete(String id) {
        if (!documentRepository.existsById(id)) {
            return false;
        }
        documentRepository.deleteById(id);
        return true;
    }

    private DocumentDto toDocumentDto(Document entity) {
        return new DocumentDto(
            entity.getId(),
            entity.getNumero()
        );
    }

    private void applyDocumentInputDto(Document entity, DocumentInputDto input) {
        entity.setNumero(input.numero());
    }
}
