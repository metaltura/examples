// The publications the screens subscribe to, served as the platform serves a
// modelled publication. Generated from the model: change the model, not this file.
import { type DocSortKey, type FieldShape, type Schema, SchemaUtil } from '@kogitec/schema/common'
import { DocAdapter } from '@kogitec/schema/server'
import { Trajet } from '../common/entities'

// The order of the platform: the label of the entity, then the key.
const byLabel = <Shape extends FieldShape>(schema: Schema<Shape>): DocSortKey[] =>
  [...new Set([SchemaUtil.labelField(schema), '_id'])].map((field) => ({ field, direction: 'asc' }))

DocAdapter.publishResolved('TrajetPublication', () => ({
  schema: Trajet,
  query: { sort: byLabel(Trajet), limit: 100 }
}))
