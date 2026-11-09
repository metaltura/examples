export interface Client {
  id: string
  nom: string
  courriels?: string[]
  state: string
  createdAt?: string
  updatedAt?: string
  createdBy?: string
  updatedBy?: string
}

export interface ClientInput {
  nom: string
  courriels?: string[]
  state: string
}
