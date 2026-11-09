import ClientModel from '../models/Client.js'
import type { Client, ClientInput } from '../payloads/Client.js'

export async function list(): Promise<Client[]> {
  const docs = await ClientModel.find()
  return docs.map(toClient)
}

export async function get(id: string): Promise<Client | null> {
  const doc = await ClientModel.findOne({ id })
  return doc ? toClient(doc) : null
}

export async function create(input: ClientInput): Promise<Client> {
  const doc = await ClientModel.create(fromClientInput(input))
  return toClient(doc)
}

export async function update(id: string, input: ClientInput): Promise<Client | null> {
  const doc = await ClientModel.findOne({ id })
  if (!doc) return null
  doc.set(fromClientInput(input))
  await doc.save()
  return toClient(doc)
}

export async function remove(id: string): Promise<boolean> {
  const result = await ClientModel.deleteOne({ id })
  return result.deletedCount > 0
}

function toClient(doc: any): Client {
  return {
    id: doc.id,
    nom: doc.nom,
    courriels: doc.courriels,
    state: doc.state,
    createdAt: doc.createdAt?.toISOString(),
    updatedAt: doc.updatedAt?.toISOString(),
    createdBy: doc.createdBy,
    updatedBy: doc.updatedBy,
  }
}

function fromClientInput(input: ClientInput) {
  return {
    nom: input.nom,
    courriels: input.courriels,
    state: input.state,
  }
}
