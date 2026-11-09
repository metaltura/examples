package com.example.boutique.repository;

import com.example.boutique.entity.Commande;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommandeRepository
        extends JpaRepository<Commande, String> {
}
