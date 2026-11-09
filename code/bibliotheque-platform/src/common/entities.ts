// The entities of the application: one schema per modelled entity.
// Generated from the model: change the model, not this file.
import {
  docSchema,
  optional,
  refString,
  string,
  type Infer
} from '@kogitec/schema/common'

export const Auteur = docSchema({
  name: 'Auteur',
  fields: {
    nom: string()
  },
  meta: { namespace: 'bibliotheque', name: 'Auteur', skipTranslation: true }
})
export type Auteur = Infer<typeof Auteur>

export const Livre = docSchema({
  name: 'Livre',
  fields: {
    titre: string(),
    auteurId: optional(refString(Auteur).withMeta({ ref: Auteur, relation: 'auteur' }))
  },
  meta: { namespace: 'bibliotheque', name: 'Livre', skipTranslation: true }
})
export type Livre = Infer<typeof Livre>

export const Lecteur = docSchema({
  name: 'Lecteur',
  fields: {
    nom: string(),
    courriel: optional(string())
  },
  meta: { namespace: 'bibliotheque', name: 'Lecteur', skipTranslation: true }
})
export type Lecteur = Infer<typeof Lecteur>
