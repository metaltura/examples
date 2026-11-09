package com.example.boutique.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "LigneDeCommande")
public class LigneDeCommande {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", nullable = false, columnDefinition = "CHAR(36)")
    private String id;

    @Column(name = "quantite", nullable = false, columnDefinition = "DOUBLE")
    private Double quantite;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "commandeId", nullable = false, columnDefinition = "CHAR(36)")
    private Commande commande;

    public LigneDeCommande() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Double getQuantite() {
        return quantite;
    }

    public void setQuantite(Double quantite) {
        this.quantite = quantite;
    }

    public Commande getCommande() {
        return commande;
    }

    public void setCommande(Commande commande) {
        this.commande = commande;
    }
}
