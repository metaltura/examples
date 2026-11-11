// The publications the screens subscribe to, served as the platform serves a
// modelled publication. Generated from the model: change the model, not this file.
import { type DocSortKey, type FieldShape, type Schema, SchemaUtil } from '@kogitec/schema/common'
import { DocAdapter } from '@kogitec/schema/server'
import { Client, Commande, Document, LigneDeCommande } from '../common/entities'

// The order of the platform: the label of the entity, then the key.
const byLabel = <Shape extends FieldShape>(schema: Schema<Shape>): DocSortKey[] =>
  [...new Set([SchemaUtil.labelField(schema), '_id'])].map((field) => ({ field, direction: 'asc' }))

DocAdapter.publishResolved('DocumentPublication', () => ({
  schema: Document,
  query: { sort: byLabel(Document), limit: 100 }
}))

DocAdapter.publishResolved('ClientPublication', () => ({
  schema: Client,
  query: { sort: byLabel(Client), limit: 100 }
}))

DocAdapter.publishResolved('CommandePublication', () => ({
  schema: Commande,
  query: { sort: byLabel(Commande), limit: 100 },
  relations: { links: { clientId: {} } }
}))

DocAdapter.publishResolved('LigneDeCommandePublication', () => ({
  schema: LigneDeCommande,
  query: { sort: byLabel(LigneDeCommande), limit: 100 }
}))
