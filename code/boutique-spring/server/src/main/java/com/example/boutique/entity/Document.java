package com.example.boutique.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "Document")
public class Document {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", nullable = false, columnDefinition = "CHAR(36)")
    private String id;

    @Column(name = "numero", nullable = false, columnDefinition = "VARCHAR(255)")
    private String numero;

    public Document() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }
}
