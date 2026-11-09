export interface Commande {
  id: string
  total?: number
  date: string
  numero: string
  clientId: string
}

export interface CommandeInput {
  total?: number
  date: string
  numero: string
  clientId: string
}
