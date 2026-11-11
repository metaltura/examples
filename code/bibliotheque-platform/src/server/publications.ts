// The publications the screens subscribe to, served as the platform serves a
// modelled publication. Generated from the model: change the model, not this file.
import { type DocSortKey, type FieldShape, type Schema, SchemaUtil } from '@kogitec/schema/common'
import { DocAdapter } from '@kogitec/schema/server'
import { Auteur, Lecteur, Livre } from '../common/entities'

// The order of the platform: the label of the entity, then the key.
const byLabel = <Shape extends FieldShape>(schema: Schema<Shape>): DocSortKey[] =>
  [...new Set([SchemaUtil.labelField(schema), '_id'])].map((field) => ({ field, direction: 'asc' }))

DocAdapter.publishResolved('AuteurPublication', () => ({
  schema: Auteur,
  query: { sort: byLabel(Auteur), limit: 100 }
}))

DocAdapter.publishResolved('LivrePublication', () => ({
  schema: Livre,
  query: { sort: byLabel(Livre), limit: 100 },
  relations: { links: { auteurId: {} } }
}))

DocAdapter.publishResolved('LecteurPublication', () => ({
  schema: Lecteur,
  query: { sort: byLabel(Lecteur), limit: 100 }
}))
