package com.example.boutique.service;

import com.example.boutique.dto.LigneDeCommandeDto;
import com.example.boutique.dto.LigneDeCommandeInputDto;
import com.example.boutique.entity.Commande;
import com.example.boutique.entity.LigneDeCommande;
import com.example.boutique.repository.LigneDeCommandeRepository;
import jakarta.persistence.EntityManager;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class LigneDeCommandeService {

    private final LigneDeCommandeRepository ligneDeCommandeRepository;
    private final EntityManager entityManager;

    public LigneDeCommandeService(
            LigneDeCommandeRepository ligneDeCommandeRepository,
            EntityManager entityManager
    ) {
        this.ligneDeCommandeRepository = ligneDeCommandeRepository;
        this.entityManager = entityManager;
    }

    public List<LigneDeCommandeDto> list() {
        return ligneDeCommandeRepository.findAll().stream().map(this::toLigneDeCommandeDto).toList();
    }

    public Optional<LigneDeCommandeDto> get(String id) {
        return ligneDeCommandeRepository.findById(id).map(this::toLigneDeCommandeDto);
    }

    public LigneDeCommandeDto create(LigneDeCommandeInputDto input) {
        LigneDeCommande entity = new LigneDeCommande();
        applyLigneDeCommandeInputDto(entity, input);
        return toLigneDeCommandeDto(ligneDeCommandeRepository.save(entity));
    }

    public Optional<LigneDeCommandeDto> update(String id, LigneDeCommandeInputDto input) {
        return ligneDeCommandeRepository.findById(id).map(entity -> {
            applyLigneDeCommandeInputDto(entity, input);
            return toLigneDeCommandeDto(ligneDeCommandeRepository.save(entity));
        });
    }

    public boolean delete(String id) {
        if (!ligneDeCommandeRepository.existsById(id)) {
            return false;
        }
        ligneDeCommandeRepository.deleteById(id);
        return true;
    }

    private LigneDeCommandeDto toLigneDeCommandeDto(LigneDeCommande entity) {
        return new LigneDeCommandeDto(
            entity.getId(),
            entity.getQuantite(),
            entity.getCommande() == null ? null : entity.getCommande().getId()
        );
    }

    private void applyLigneDeCommandeInputDto(LigneDeCommande entity, LigneDeCommandeInputDto input) {
        entity.setQuantite(input.quantite());
        entity.setCommande(input.commandeId() == null ? null
            : entityManager.getReference(Commande.class, input.commandeId()));
    }
}
