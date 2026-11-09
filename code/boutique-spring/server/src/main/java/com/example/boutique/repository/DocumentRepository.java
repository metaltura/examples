package com.example.boutique.repository;

import com.example.boutique.entity.Document;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DocumentRepository
        extends JpaRepository<Document, String> {
}
