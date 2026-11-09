# Boutique — Spring Boot + Angular

Generated from the Spring context `boutique` and the Angular frontend `web`
of the application `Boutique`. Regenerated at each change
of the model: edit the model, not these files.

- `server/` — the API: Spring Boot + JPA + MariaDB, built by Maven.
- `client/` — the user interface: Angular.
- `docker-compose.yml` — the MariaDB database.

## Prerequisites

Java 17+, Maven 3.9, Docker with Compose, and Node 22.22.3+ or 24.15+.

## Run

1. `docker compose up -d` — MariaDB listens on
   `localhost:3306` with an empty database `db`.
2. In `server/`: `mvn spring-boot:run` — the API listens on
   `http://localhost:8080` and creates the tables at start. A
   database just started may refuse the first connection: wait
   a few seconds and run it again.
3. In `client/`: `npm install` then `npm start` — the client
   opens on `http://localhost:4200` and calls the API through
   the dev server of Angular.

`docker compose down` stops the database and removes it with its
data. After a field is added to the model, it is how the tables
are created again: `docker compose down` then
`docker compose up -d`.
