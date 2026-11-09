import CommandeModel from '../models/Commande.js'
import type { Commande, CommandeInput } from '../payloads/Commande.js'

export async function list(): Promise<Commande[]> {
  const docs = await CommandeModel.find()
  return docs.map(toCommande)
}

export async function get(id: string): Promise<Commande | null> {
  const doc = await CommandeModel.findOne({ id })
  return doc ? toCommande(doc) : null
}

export async function create(input: CommandeInput): Promise<Commande> {
  const doc = await CommandeModel.create(fromCommandeInput(input))
  return toCommande(doc)
}

export async function update(id: string, input: CommandeInput): Promise<Commande | null> {
  const doc = await CommandeModel.findOne({ id })
  if (!doc) return null
  doc.set(fromCommandeInput(input))
  await doc.save()
  return toCommande(doc)
}

export async function remove(id: string): Promise<boolean> {
  const result = await CommandeModel.deleteOne({ id })
  return result.deletedCount > 0
}

function toCommande(doc: any): Commande {
  return {
    id: doc.id,
    total: doc.total,
    date: doc.date?.toISOString(),
    numero: doc.numero,
    clientId: doc.clientId,
    createdAt: doc.createdAt?.toISOString(),
    updatedAt: doc.updatedAt?.toISOString(),
    createdBy: doc.createdBy,
    updatedBy: doc.updatedBy,
  }
}

function fromCommandeInput(input: CommandeInput) {
  return {
    total: input.total,
    date: input.date,
    numero: input.numero,
    clientId: input.clientId,
  }
}
