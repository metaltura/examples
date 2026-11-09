import DocumentModel from '../models/Document.js'
import type { Document, DocumentInput } from '../payloads/Document.js'

export async function list(): Promise<Document[]> {
  const docs = await DocumentModel.find()
  return docs.map(toDocument)
}

export async function get(id: string): Promise<Document | null> {
  const doc = await DocumentModel.findOne({ id })
  return doc ? toDocument(doc) : null
}

export async function create(input: DocumentInput): Promise<Document> {
  const doc = await DocumentModel.create(fromDocumentInput(input))
  return toDocument(doc)
}

export async function update(id: string, input: DocumentInput): Promise<Document | null> {
  const doc = await DocumentModel.findOne({ id })
  if (!doc) return null
  doc.set(fromDocumentInput(input))
  await doc.save()
  return toDocument(doc)
}

export async function remove(id: string): Promise<boolean> {
  const result = await DocumentModel.deleteOne({ id })
  return result.deletedCount > 0
}

function toDocument(doc: any): Document {
  return {
    id: doc.id,
    numero: doc.numero,
    createdAt: doc.createdAt?.toISOString(),
    updatedAt: doc.updatedAt?.toISOString(),
    createdBy: doc.createdBy,
    updatedBy: doc.updatedBy,
  }
}

function fromDocumentInput(input: DocumentInput) {
  return {
    numero: input.numero,
  }
}
