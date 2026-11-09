package com.example.boutique.service;

import com.example.boutique.dto.CommandeDto;
import com.example.boutique.dto.CommandeInputDto;
import com.example.boutique.entity.Client;
import com.example.boutique.entity.Commande;
import com.example.boutique.repository.CommandeRepository;
import jakarta.persistence.EntityManager;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class CommandeService {

    private final CommandeRepository commandeRepository;
    private final EntityManager entityManager;

    public CommandeService(
            CommandeRepository commandeRepository,
            EntityManager entityManager
    ) {
        this.commandeRepository = commandeRepository;
        this.entityManager = entityManager;
    }

    public List<CommandeDto> list() {
        return commandeRepository.findAll().stream().map(this::toCommandeDto).toList();
    }

    public Optional<CommandeDto> get(String id) {
        return commandeRepository.findById(id).map(this::toCommandeDto);
    }

    public CommandeDto create(CommandeInputDto input) {
        Commande entity = new Commande();
        applyCommandeInputDto(entity, input);
        return toCommandeDto(commandeRepository.save(entity));
    }

    public Optional<CommandeDto> update(String id, CommandeInputDto input) {
        return commandeRepository.findById(id).map(entity -> {
            applyCommandeInputDto(entity, input);
            return toCommandeDto(commandeRepository.save(entity));
        });
    }

    public boolean delete(String id) {
        if (!commandeRepository.existsById(id)) {
            return false;
        }
        commandeRepository.deleteById(id);
        return true;
    }

    private CommandeDto toCommandeDto(Commande entity) {
        return new CommandeDto(
            entity.getId(),
            entity.getTotal(),
            entity.getDate(),
            entity.getNumero(),
            entity.getClient() == null ? null : entity.getClient().getId()
        );
    }

    private void applyCommandeInputDto(Commande entity, CommandeInputDto input) {
        entity.setTotal(input.total());
        entity.setDate(input.date());
        entity.setNumero(input.numero());
        entity.setClient(input.clientId() == null ? null
            : entityManager.getReference(Client.class, input.clientId()));
    }
}
