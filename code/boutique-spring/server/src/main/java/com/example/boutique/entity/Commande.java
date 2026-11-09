package com.example.boutique.entity;

import jakarta.persistence.*;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "Commande")
public class Commande {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", nullable = false, columnDefinition = "CHAR(36)")
    private String id;

    @Column(name = "total", columnDefinition = "DOUBLE")
    private Double total;

    @Column(name = "date", nullable = false, columnDefinition = "TIMESTAMP")
    private Instant date;

    @Column(name = "numero", nullable = false, columnDefinition = "VARCHAR(255)")
    private String numero;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "clientId", nullable = false, columnDefinition = "CHAR(36)")
    private Client client;

    @OneToMany(mappedBy = "commande", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<LigneDeCommande> lignes = new ArrayList<>();

    public Commande() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Double getTotal() {
        return total;
    }

    public void setTotal(Double total) {
        this.total = total;
    }

    public Instant getDate() {
        return date;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public List<LigneDeCommande> getLignes() {
        return lignes;
    }

    public void setLignes(List<LigneDeCommande> lignes) {
        this.lignes = lignes;
    }
}
