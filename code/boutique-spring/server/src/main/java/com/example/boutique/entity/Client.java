package com.example.boutique.entity;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

@Entity
@Table(name = "Client")
public class Client {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", nullable = false, columnDefinition = "CHAR(36)")
    private String id;

    @Column(name = "nom", nullable = false, columnDefinition = "VARCHAR(255)")
    private String nom;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "courriels", columnDefinition = "LONGTEXT")
    private List<String> courriels;

    @Column(name = "state", nullable = false, columnDefinition = "VARCHAR(255)")
    private String state;

    @OneToMany(mappedBy = "client")
    private List<Commande> commandes = new ArrayList<>();

    public Client() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public List<String> getCourriels() {
        return courriels;
    }

    public void setCourriels(List<String> courriels) {
        this.courriels = courriels;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public List<Commande> getCommandes() {
        return commandes;
    }

    public void setCommandes(List<Commande> commandes) {
        this.commandes = commandes;
    }
}
