# Boutique — Node + React

Generated from the Node server `boutique` and the React frontend `web` of
the application `Boutique`. Regenerated at each change of the model: edit the
model, not these files.

- `server/` — the API: Node + Express + MongoDB.
- `client/` — the user interface: Vite + React + TypeScript.

## Run

1. A MongoDB server: `server/README.md` says which one.
2. `npm install` — installs both projects.
3. `npm start` — the API listens on `http://localhost:3000`, the client opens
   on `http://localhost:5173` and calls the API through Vite.

`npm run typecheck` checks the types of both projects, `npm run build`
builds them. Each project also runs alone: `npm start` in its folder.
