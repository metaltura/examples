import LigneDeCommandeModel from '../models/LigneDeCommande.js'
import type { LigneDeCommande, LigneDeCommandeInput } from '../payloads/LigneDeCommande.js'

export async function list(): Promise<LigneDeCommande[]> {
  const docs = await LigneDeCommandeModel.find()
  return docs.map(toLigneDeCommande)
}

export async function get(id: string): Promise<LigneDeCommande | null> {
  const doc = await LigneDeCommandeModel.findOne({ id })
  return doc ? toLigneDeCommande(doc) : null
}

export async function create(input: LigneDeCommandeInput): Promise<LigneDeCommande> {
  const doc = await LigneDeCommandeModel.create(fromLigneDeCommandeInput(input))
  return toLigneDeCommande(doc)
}

export async function update(id: string, input: LigneDeCommandeInput): Promise<LigneDeCommande | null> {
  const doc = await LigneDeCommandeModel.findOne({ id })
  if (!doc) return null
  doc.set(fromLigneDeCommandeInput(input))
  await doc.save()
  return toLigneDeCommande(doc)
}

export async function remove(id: string): Promise<boolean> {
  const result = await LigneDeCommandeModel.deleteOne({ id })
  return result.deletedCount > 0
}

function toLigneDeCommande(doc: any): LigneDeCommande {
  return {
    id: doc.id,
    quantite: doc.quantite,
    commandeId: doc.commandeId,
    createdAt: doc.createdAt?.toISOString(),
    updatedAt: doc.updatedAt?.toISOString(),
    createdBy: doc.createdBy,
    updatedBy: doc.updatedBy,
  }
}

function fromLigneDeCommandeInput(input: LigneDeCommandeInput) {
  return {
    quantite: input.quantite,
    commandeId: input.commandeId,
  }
}
