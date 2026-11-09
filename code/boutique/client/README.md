# Boutique — React

Generated from the React frontend `web` of the application
`Boutique`. Regenerated at each change of the model: edit the
model, not these files.

## Run

1. The API server, listening on `http://localhost:3000`.
2. `npm install`
3. `npm start` — the client opens on `http://localhost:5173`; Vite
   forwards `/api` to the API server.

`npm run typecheck` checks the types, `npm run build` writes the
client under `dist/`.

## API clients

- `src/api/DocumentApi.ts` — `/api/documents`
- `src/api/ClientApi.ts` — `/api/clients`
- `src/api/CommandeApi.ts` — `/api/commandes`
- `src/api/LigneDeCommandeApi.ts` — `/api/lignedecommandes`
