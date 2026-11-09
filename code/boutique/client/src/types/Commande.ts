export interface Commande {
  id: string
  total?: number
  date: string
  numero: string
  clientId: string
  createdAt?: string
  updatedAt?: string
  createdBy?: string
  updatedBy?: string
}

export interface CommandeInput {
  total?: number
  date: string
  numero: string
  clientId: string
}
