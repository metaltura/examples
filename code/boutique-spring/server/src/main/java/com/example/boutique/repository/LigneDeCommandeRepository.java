package com.example.boutique.repository;

import com.example.boutique.entity.LigneDeCommande;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LigneDeCommandeRepository
        extends JpaRepository<LigneDeCommande, String> {
}
