package com.example.boutique.repository;

import com.example.boutique.entity.Client;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientRepository
        extends JpaRepository<Client, String> {
}
