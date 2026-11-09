# Boutique — Spring Boot

Generated from the Spring context `boutique` of the application
`Boutique`. Regenerated at each change of the model: edit the
model, not these files.

## Run

1. A MariaDB server on `localhost:3306` with a database named
   `db`; `DB_USER` and `DB_PASSWORD` name its credentials
   (defaults: `root` and empty).
   The `docker-compose.yml` at the root of a Spring + Angular project
   starts one: `docker compose up -d`.
2. `mvn spring-boot:run` — the API listens on `http://localhost:8080`.
   A database just started may refuse the first connection: wait a
   few seconds and run it again.

## Schema

Spring creates the missing tables at start from
`src/main/resources/schema.sql`, then Hibernate checks that the
entities match them and changes nothing. After a field is added to
the model, the check fails until the database is created again
(`docker compose down` then `docker compose up -d`).

## Resources

- `/api/documents` — Document
- `/api/clients` — Client
- `/api/commandes` — Commande
- `/api/lignedecommandes` — LigneDeCommande
