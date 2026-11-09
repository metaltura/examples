-- The schema of the database db, generated from the model.
-- Played by Spring at start, checked by Hibernate.

CREATE TABLE IF NOT EXISTS `Document` (
  `id` CHAR(36) NOT NULL,
  `numero` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `Client` (
  `id` CHAR(36) NOT NULL,
  `nom` VARCHAR(255) NOT NULL,
  `courriels` JSON,
  `state` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `Commande` (
  `id` CHAR(36) NOT NULL,
  `total` DOUBLE,
  `date` TIMESTAMP NOT NULL,
  `numero` VARCHAR(255) NOT NULL,
  `clientId` CHAR(36) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`clientId`) REFERENCES `Client` (`id`)
);

CREATE TABLE IF NOT EXISTS `LigneDeCommande` (
  `id` CHAR(36) NOT NULL,
  `quantite` DOUBLE NOT NULL,
  `commandeId` CHAR(36) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`commandeId`) REFERENCES `Commande` (`id`)
);
