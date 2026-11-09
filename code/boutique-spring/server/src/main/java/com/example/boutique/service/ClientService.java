package com.example.boutique.service;

import com.example.boutique.dto.ClientDto;
import com.example.boutique.dto.ClientInputDto;
import com.example.boutique.entity.Client;
import com.example.boutique.repository.ClientRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ClientService {

    private final ClientRepository clientRepository;

    public ClientService(
            ClientRepository clientRepository
    ) {
        this.clientRepository = clientRepository;
    }

    public List<ClientDto> list() {
        return clientRepository.findAll().stream().map(this::toClientDto).toList();
    }

    public Optional<ClientDto> get(String id) {
        return clientRepository.findById(id).map(this::toClientDto);
    }

    public ClientDto create(ClientInputDto input) {
        Client entity = new Client();
        applyClientInputDto(entity, input);
        return toClientDto(clientRepository.save(entity));
    }

    public Optional<ClientDto> update(String id, ClientInputDto input) {
        return clientRepository.findById(id).map(entity -> {
            applyClientInputDto(entity, input);
            return toClientDto(clientRepository.save(entity));
        });
    }

    public boolean delete(String id) {
        if (!clientRepository.existsById(id)) {
            return false;
        }
        clientRepository.deleteById(id);
        return true;
    }

    private ClientDto toClientDto(Client entity) {
        return new ClientDto(
            entity.getId(),
            entity.getNom(),
            entity.getCourriels(),
            entity.getState()
        );
    }

    private void applyClientInputDto(Client entity, ClientInputDto input) {
        entity.setNom(input.nom());
        entity.setCourriels(input.courriels() == null ? new ArrayList<>()
            : input.courriels());
        entity.setState(input.state());
    }
}
