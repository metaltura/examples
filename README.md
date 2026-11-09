# metaltura/examples

Les exemples de la librairie metaltura : une boutique branchée sur chacune des trois piles, une bibliothèque dessinée directement en entités de la plateforme, et des trajets gardés dans une table PostgreSQL existante. Chaque exemple porte, sous `code/`, le projet que Metaltura en produit : il se lit et se lance sans ouvrir l'atelier.

## Ce qu'il contient

- `models/BoutiqueDomain.yaml` — le domaine de la boutique : il instancie chaque classe de Domain une fois. Il donne l'application `Boutique` (PLAT-1157).
- `models/BoutiqueNodeReact.yaml` — la boutique sur la pile Node + React, en deux paquets :
  - `application` : `nodeAudit`, une instance de `DomainToNode` dont l'option `audit` est active, et le Mapping `versNode` qui la branche sur `BoutiqueDomain`. Il produit l'Application `Boutique` (base Mongo, API), le serveur Express `node.boutique` et l'interface React `react.web` ;
  - `code` : le dossier système `boutique` et le Mapping `versCode`, qui branche le serveur sur `nodeReactToCode`. Le projet produit (le serveur et le client React) est écrit sous `code/boutique/`.
- `models/BoutiqueSpringAngular.yaml` — la boutique sur la pile Spring + Angular, de la même forme :
  - `application` : le Mapping `versSpring`, qui branche `BoutiqueDomain` sur `domainToSpring`. Il produit l'Application `Boutique` (base SQL, API), le contexte Spring `spring.boutique` et l'interface Angular `angular.web` ;
  - `code` : le dossier système `boutique-spring` et le Mapping `versCode`, qui branche le contexte sur `springAngularToCode`. Le projet produit (le serveur Spring et le client Angular) est écrit sous `code/boutique-spring/`.
- `models/BoutiquePlatform.yaml` — la boutique sur la plateforme, de la même forme (PLAT-1157) :
  - `application` : le Mapping `versPlateforme`, qui branche `BoutiqueDomain` sur `domainToPlatform`. Il produit les entités modélisées `Document`, `Client`, `Commande` et `LigneDeCommande`, et le module `boutique` avec ses quatre boutons et ses quatre écrans (`/boutique/clients`…). Le module est rangé dans le paquet `application` : le menu latéral d'une instance de la plateforme ne lit aujourd'hui que les modules posés à la racine d'un modèle, et la catégorie « Boutique » n'y paraît pas. PLAT-1586 l'étend aux modules rangés dans un paquet ;
  - `code` : le dossier système `boutique-platform` et le Mapping `versCode`, qui branche le paquet `application` sur `platformToCode`. Le projet produit est écrit sous `code/boutique-platform/`. Comme tout projet que `platformToCode` écrit, il porte un `Dockerfile` et un `.dockerignore` qui le construisent en image Docker (PLAT-1461).
- `models/Bibliotheque.yaml` — un modèle d'entités déjà dessinées (PLAT-1459) : trois documents de la plateforme.
  - `Auteur` : `nom`.
  - `Livre` : `titre`, et la relation `auteur` vers `Auteur`.
  - `Lecteur` : `nom` et `courriel`.
- `models/BibliothequePlatform.yaml` — la bibliothèque sur la plateforme, de la même forme que `BoutiquePlatform` :
  - `application` : le Mapping `versPlateforme`, qui branche `Bibliotheque` sur `entitiesToPlatform`. Il produit le module `bibliotheque` avec ses trois boutons et ses trois écrans (`/bibliotheque/livres`…), et aucune entité. Comme celui de la boutique, le module est rangé dans le paquet `application` et ne paraît pas au menu latéral d'une instance avant PLAT-1586 ;
  - `code` : le dossier système `bibliotheque-platform` et le Mapping `versCode`, qui branche le paquet `application` sur `platformToCode`. Le projet produit est écrit sous `code/bibliotheque-platform/` : ses schémas sont ceux des entités de `Bibliotheque`, que les écrans nomment.
- `models/Trajets.yaml` — un modèle d'entités déjà dessinées gardé dans une base PostgreSQL existante (PLAT-1460) : l'entité `Trajet` du guide PostgreSQL de la plateforme (un guide interne de Kogitec, qui ne se lit pas depuis ce dépôt), sur la table `kitchen_trips`.
  - Ses huit champs nomment leur colonne : `conducteur` est lu dans `driver_name`, `prix` dans `price`…
  - Elle emploie les six sortes d'une base existante, dont `prix` en décimal à deux décimales (`scale: 2`).
  - Elle se lit et se modifie par le rôle `user` (`readRoles`, `updateRoles`), sans création ni suppression.
- `models/TrajetsPlatform.yaml` — les trajets sur la plateforme, de la même forme que `BibliothequePlatform` :
  - `application` : le Mapping `versPlateforme`, qui branche `Trajets` sur `entitiesToPlatform`. Il produit le module `trajets` avec son bouton et son écran (`/trajets/trajets`) ;
  - `code` : le dossier système `trajets-platform` et le Mapping `versCode`, qui branche le paquet `application` sur `platformToCode`. Le projet produit est écrit sous `code/trajets-platform/` : son schéma `Trajet` porte la table, les colonnes, les sortes et les droits, et son `README.md` dit comment le pointer sur la base.

On branche une pile sur un domaine dans un modèle d'exemple de cette forme :

1. Un paquet `application` avec un Mapping : le patron de tête de la pile comme mapper, le modèle de domaine comme source, le paquet lui-même comme cible.
2. Un paquet `code` avec un dossier système (`FileSystem:SystemFolder`, son `rootPath` nomme le dossier sous `code/`) et un Mapping : le patron de tête de génération comme mapper, le serveur, le contexte ou le paquet `application` comme source, le dossier système comme cible.

Un modèle d'entités déjà dessinées se branche de même sur `entitiesToPlatform` : le modèle ou le package d'entités comme source, et un modèle d'exemple qui dépend de lui et de `Compositions` (`metaltura/platform/Compositions@v1.0.0`).

Chaque modification de l'espace de travail rejoue les patrons et réécrit les fichiers qui changent. Une retouche faite à la main sur un élément ou un fichier produit est conservée.

Les cinq projets produits sont sous `code/`, tels que Metaltura les écrit sur disque. Ils ne se modifient pas à la main : on change le modèle.

- `code/boutique/`, avec `server/` et `client/` ;
- `code/boutique-spring/`, avec `server/` et `client/` ;
- `code/boutique-platform/` ;
- `code/bibliotheque-platform/` ;
- `code/trajets-platform/`.

Les `README.md` de trois projets produits disent encore « Generated by simple-mda » :

- `boutique-platform` ;
- `bibliotheque-platform` ;
- `trajets-platform`.

C'est le nom de l'ancien dépôt de ces modèles. Les projets produits n'ont pas changé d'un octet dans le déménagement ; la phrase changera avec le patron `PlatformToCode`.

`.gitignore` ignore ce que les outils des piles créent sous `code/` (`node_modules` · `dist` · `target` · `.angular`) : un `npm install` ou un `mvn package` joué dans un projet produit ne salit pas le dépôt.

## Ce dont il dépend

Des neuf autres dépôts de la librairie, chacun à `v1.0.0` :

| Dépôt | Ce que les exemples en emploient | Ligne `depends` |
| --- | --- | --- |
| `metaltura/domain` | `Domain`, que `BoutiqueDomain` instancie | `metaltura/domain/Domain@v1.0.0` |
| `metaltura/application` | `Application` et `DomainToApplication` | `metaltura/application/Application@v1.0.0`<br>`metaltura/application/DomainToApplication@v1.0.0` |
| `metaltura/node` | `Node` | `metaltura/node/Node@v1.0.0` |
| `metaltura/react` | `React` | `metaltura/react/React@v1.0.0` |
| `metaltura/spring` | `Spring` | `metaltura/spring/Spring@v1.0.0` |
| `metaltura/angular` | `Angular` | `metaltura/angular/Angular@v1.0.0` |
| `metaltura/node-react` | `DomainToNodeReact` et `NodeReactToCode` | `metaltura/node-react/DomainToNodeReact@v1.0.0`<br>`metaltura/node-react/NodeReactToCode@v1.0.0` |
| `metaltura/spring-angular` | `DomainToSpringAngular` et `SpringAngularToCode` | `metaltura/spring-angular/DomainToSpringAngular@v1.0.0`<br>`metaltura/spring-angular/SpringAngularToCode@v1.0.0` |
| `metaltura/platform` | `DomainToPlatform`, `EntitiesToPlatform`, `Compositions` et `PlatformToCode` | `metaltura/platform/DomainToPlatform@v1.0.0`<br>`metaltura/platform/EntitiesToPlatform@v1.0.0`<br>`metaltura/platform/Compositions@v1.0.0`<br>`metaltura/platform/PlatformToCode@v1.0.0` |

Chaque modèle d'exemple écrit ces lignes à la fin de son fichier, pour les seuls modèles qu'il emploie. Par exemple `BoutiqueNodeReact` :

```yaml
depends:
  - Mapping
  - BoutiqueDomain
  - FileSystem
  - metaltura/application/Application@v1.0.0
  - metaltura/node/Node@v1.0.0
  - metaltura/react/React@v1.0.0
  - metaltura/application/DomainToApplication@v1.0.0
  - metaltura/node-react/DomainToNodeReact@v1.0.0
  - metaltura/node-react/NodeReactToCode@v1.0.0
```

Ces modèles s'écrivent par leur nom seul, en tête :

- un modèle du même dépôt, comme `BoutiqueDomain` ;
- un modèle système de Metaltura :
  - `Mapping` ;
  - `FileSystem` ;
  - `Platform`.

Les lignes de dépôt suivent.

## L'ouvrir dans Metaltura

L'espace de travail d'une instance de la plateforme est un dépôt git : il suffit qu'il soit un clone de ce dépôt.

```bash
git clone https://github.com/metaltura/examples.git <espace de travail>
```

À l'ouverture, Metaltura clone chaque dépôt nommé dans une ligne `depends` à son étiquette, sans jeton : la librairie est publique. Les modèles de ce dépôt sont modifiables ; ceux des dépôts récupérés se lisent sans se modifier.

Ce dépôt n'est pas une dépendance : aucun autre dépôt de la librairie ne le nomme.

## Lancer les projets produits

### Lancer l'application de la boutique sur un poste

Le projet produit `code/boutique/` tourne tel qu'il est dans le dépôt. Il faut Node 22 ou plus récent et un MongoDB local :

```bash
docker run -d --name boutique-mongo -p 27017:27017 mongo:7   # un MongoDB sur le port 27017
cd code/boutique
npm install    # installe le serveur et le client
npm start      # l'API sur http://localhost:3000/api · le client sur http://localhost:5173
```

Le client appelle l'API par le proxy de Vite : aucune configuration CORS. `MONGO_URL` change la base (par défaut `mongodb://localhost:27017/db` : la base `db` du modèle) · `PORT` le port de l'API. `npm run typecheck` et `npm run build` vérifient et construisent les deux projets. Le `package-lock.json`, `node_modules` et `dist` que ces commandes créent ne se commitent pas.

### Lancer l'application Spring + Angular de la boutique sur un poste

Le projet produit `code/boutique-spring/` tourne tel qu'il est dans le dépôt. Il faut Java 17 ou plus récent, Maven 3.9, Docker et Node 22.22.3 ou 24.15 au moins (ce qu'Angular 22 accepte) :

```bash
cd code/boutique-spring
docker compose up -d                    # MariaDB 11 sur le port 3306 · la base db du modèle
(cd server && mvn spring-boot:run)      # l'API sur http://localhost:8080/api · crée les tables au démarrage
(cd client && npm install && npm start) # dans un second terminal · le client sur http://localhost:4200
```

Le client appelle l'API par le proxy du serveur de développement d'Angular : aucune configuration CORS. Une base qui vient de démarrer peut refuser la première connexion de Spring : attendre quelques secondes et relancer. Hibernate vérifie au démarrage que les tables correspondent aux entités : après un champ ajouté au domaine, `docker compose down` puis `docker compose up -d` recréent une base vide. `DB_USER` et `DB_PASSWORD` changent les identifiants de la base (par défaut `root` sans mot de passe). Un port 8080 déjà pris : `SERVER_PORT=8089 mvn spring-boot:run`, puis dans `client/` un fichier de proxy qui vise ce port, passé par `npm start -- --proxy-config <fichier>`.

L'application se comporte comme celle de la boutique Node (PLAT-162) : mêmes pages, mêmes chemins, mêmes codes et mêmes corps de l'API. Quatre différences tiennent à la pile : la suppression d'un client encore commandé répond 409 (MariaDB a des clés étrangères, MongoDB non), la suppression d'une commande supprime ses lignes, une liste suit l'ordre de la clé et non celui de l'insertion, et les champs d'audit (`createdAt`…) n'existent que dans l'exemple Node. Le `target`, le `package-lock.json`, `node_modules`, `dist` et `.angular` que ces commandes créent ne se commitent pas.

### Lancer l'application plateforme de la boutique sur un poste

Le projet produit `code/boutique-platform/` tourne tel qu'il est dans le dépôt, sur les paquets `@kogitec/*` publiés. Il faut Node 24, Docker et un jeton GitHub qui a le droit `read:packages` :

```bash
export NODE_AUTH_TOKEN=<le jeton>   # GitHub Packages, où les paquets @kogitec/* sont publiés
docker run -d --name boutique-platform-mongo -p 27017:27017 mongo:7 --replSet rs0
docker exec boutique-platform-mongo mongosh --quiet --eval 'rs.initiate({_id:"rs0",members:[{_id:0,host:"localhost:27017"}]})'
cd code/boutique-platform
npm install    # les paquets de la plateforme
npm start      # construit l'interface, puis le serveur sert l'application sur http://localhost:8081
```

Le menu latéral montre la catégorie « Boutique » et ses quatre boutons. L'écran de chaque entité montre sa liste à gauche et son formulaire à droite. Sans fournisseur de connexion, l'application s'ouvre sous l'identité « Développeur local ». `MONGO_URL` change la base (par défaut `mongodb://localhost:27017/kogitec`), `PORT` le port. Sans jeton, `npm install` échoue sur le premier paquet `@kogitec/*` (« npm error code E401 ») : le README du projet dit pourquoi. `npm run typecheck` vérifie les types. Le `package-lock.json`, `node_modules` et `dist` que ces commandes créent ne se commitent pas.

Le même projet se construit en image Docker, le jeton passé à la construction comme secret : il ne reste dans aucune couche de l'image. L'image ouvre la connexion obligatoire par défaut ; `REQUIRE_AUTH=false` l'essaie sous l'identité « Développeur local » :

```bash
cd code/boutique-platform
NODE_AUTH_TOKEN=<le jeton> docker build --secret id=node_auth_token,env=NODE_AUTH_TOKEN -t boutique .
docker run --rm -e REQUIRE_AUTH=false -p 8081:8081 boutique   # http://localhost:8081
```

Le projet compte beaucoup moins de lignes que celui de la pile Node + React, comptées de la même façon sur tous leurs fichiers, sans `node_modules`, `dist` ni `package-lock.json` :

```bash
find <dossier> -type f -not -path '*/node_modules/*' -not -path '*/dist/*' -not -name package-lock.json | xargs cat | wc -l
```

| Projet | Lignes au 2026-10-31 |
| --- | --- |
| `code/boutique` (Node + React) | 2 429 |
| `code/boutique-platform` (la plateforme) | 375 |

### Lancer l'application plateforme de la bibliothèque sur un poste

Le projet produit `code/bibliotheque-platform/` se lance comme celui de la boutique, avec les mêmes prérequis. L'exemple ci-dessous prend le port 27018 pour MongoDB : il ne gêne pas un MongoDB déjà lancé sur 27017.

```bash
export NODE_AUTH_TOKEN=<le jeton>   # GitHub Packages, où les paquets @kogitec/* sont publiés
docker run -d --name bibliotheque-platform-mongo -p 27018:27018 mongo:7 --replSet rs0 --port 27018
docker exec bibliotheque-platform-mongo mongosh --port 27018 --quiet --eval 'rs.initiate({_id:"rs0",members:[{_id:0,host:"localhost:27018"}]})'
export MONGO_URL='mongodb://localhost:27018/bibliotheque?replicaSet=rs0'
cd code/bibliotheque-platform
npm install    # les paquets de la plateforme
npm start      # construit l'interface, puis le serveur sert l'application sur http://localhost:8081
```

Le menu latéral montre la catégorie « Bibliotheque » et ses trois boutons :

- « Auteur » ;
- « Livre » ;
- « Lecteur ».

Le formulaire d'un livre propose ses auteurs dans « Auteur ». `PORT` change le port. Le `package-lock.json`, `node_modules` et `dist` que ces commandes créent ne se commitent pas.

### Lancer l'exemple des trajets sur un poste

Le projet produit `code/trajets-platform/` lit et modifie la table `kitchen_trips` d'une base PostgreSQL, sans MongoDB. Il faut Node 24, Docker et le même jeton GitHub que pour la boutique. La base jetable ci-dessous est celle du guide PostgreSQL de la plateforme : elle prend le port 55432 et ne gêne pas une base déjà lancée.

```bash
export NODE_AUTH_TOKEN=<le jeton>   # GitHub Packages, où les paquets @kogitec/* sont publiés
docker run -d --name kitchen-pg -e POSTGRES_USER=qa -e POSTGRES_PASSWORD=qa -p 55432:5432 postgres:16 -c wal_level=logical
sleep 5                             # le temps que la base accepte les connexions
docker exec -i kitchen-pg psql -U qa -d qa <<'SQL'
CREATE TABLE kitchen_trips (
  id serial PRIMARY KEY,
  driver_name text NOT NULL,
  seats bigint NOT NULL,
  price numeric(8,2) NOT NULL,
  departure_date date NOT NULL,
  departure_time time NOT NULL,
  booked_at timestamptz,
  notes text,
  options jsonb
);
INSERT INTO kitchen_trips (driver_name, seats, price, departure_date, departure_time, booked_at, notes, options) VALUES
  ('Éric Gagnon', 3, 12.50, '2026-11-03', '08:30', '2026-10-30 14:00+00', NULL, NULL),
  ('Zoé Roy', 2, 7.25, '2026-11-04', '17:15', NULL, 'Bagages permis', '{"animaux": true}'),
  ('émile Côté', 4, 30.00, '2026-11-05', '06:45', NULL, NULL, NULL);
CREATE PUBLICATION platform FOR TABLE kitchen_trips;
SQL
cd code/trajets-platform
npm install    # les paquets de la plateforme
POSTGRES_URL=postgres://qa:qa@localhost:55432/qa npm start
```

Le SQL est celui du guide, entre ses marques `kitchen_trips:start` et `kitchen_trips:end`. Au démarrage, le journal du serveur dit :

```text
[schema] PostgreSQL answers at postgres://qa:***@localhost:55432/qa: connected
[schema] PostgreSQL changes are followed by logical replication (publication platform)
```

puis, une seule fois, que MongoDB ne répond pas : le serveur tourne quand même. Le menu latéral montre la catégorie « Trajets » et son bouton « Trajet ». La liste montre les trois lignes de la table ; une modification enregistrée dans le formulaire est écrite dans `kitchen_trips`, et une ligne modifiée dans `psql` paraît dans la liste sans recharger la page. L'entité ne donne au rôle `user` que la lecture et la modification : ni création ni suppression. Un port 8081 déjà pris : `PORT=8091` devant `npm start`.

Pour tout retirer : `docker rm -f kitchen-pg`. Le `package-lock.json`, `node_modules` et `dist` que ces commandes créent ne se commitent pas.

## D'où il vient

Ce dépôt vient du dépôt privé `Kogitec/simple-mda`, `main` à `96a1a75` (PLAT-1461), rangé par sujet par PLAT-1498 en un seul commit : ses modèles étaient sous `models/examples/`, et `code/` et `.gitignore` à la racine. L'historique de ses fichiers reste dans `simple-mda`, archivé.
