export interface Document {
  id: string
  numero: string
  createdAt?: string
  updatedAt?: string
  createdBy?: string
  updatedBy?: string
}

export interface DocumentInput {
  numero: string
}
