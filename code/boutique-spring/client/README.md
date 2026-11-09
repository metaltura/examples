# Boutique — Angular

Generated from the Angular frontend `web` of the application
`Boutique`. Regenerated at each change of the model: edit the
model, not these files.

## Run

Node 22.22.3+ or 24.15+ (the versions Angular 22.2.3 accepts).

1. The API server, listening on `http://localhost:8080`.
2. `npm install`
3. `npm start` — the client opens on `http://localhost:4200`; the dev
   server forwards `/api` to the API server.

`npm run typecheck` checks the types, `npm run build` writes the
client under `dist/`.

## Services

- `src/app/api/document-api.service.ts` — `/api/documents`
- `src/app/api/client-api.service.ts` — `/api/clients`
- `src/app/api/commande-api.service.ts` — `/api/commandes`
- `src/app/api/ligne-de-commande-api.service.ts` — `/api/lignedecommandes`
