// The entities of the application: one schema per modelled entity.
// Generated from the model: change the model, not this file.
import {
  array,
  date,
  docSchema,
  number,
  optional,
  refString,
  string,
  type Infer
} from '@kogitec/schema/common'

export const Document = docSchema({
  name: 'Document',
  fields: {
    numero: string()
  },
  meta: { namespace: 'boutique', name: 'Document', skipTranslation: true }
})
export type Document = Infer<typeof Document>

export const Client = docSchema({
  name: 'Client',
  fields: {
    nom: string(),
    courriels: optional(array(string()))
  },
  meta: { namespace: 'boutique', name: 'Client', skipTranslation: true }
})
export type Client = Infer<typeof Client>

export const LigneDeCommande = docSchema({
  name: 'LigneDeCommande',
  fields: {
    quantite: number()
  },
  meta: { namespace: 'boutique', name: 'LigneDeCommande', skipTranslation: true }
})
export type LigneDeCommande = Infer<typeof LigneDeCommande>

export const Commande = docSchema({
  name: 'Commande',
  fields: {
    total: optional(number()),
    date: date(),
    numero: string(),
    clientId: refString(Client).withMeta({ ref: Client, relation: 'client' }),
    lignesIds: optional(array(refString(LigneDeCommande)).withMeta({ ref: LigneDeCommande, relation: 'lignes' }))
  },
  meta: { namespace: 'boutique', name: 'Commande', skipTranslation: true }
})
export type Commande = Infer<typeof Commande>
