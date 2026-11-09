export interface Client {
  id: string
  nom: string
  courriels?: string[]
  state: string
}

export interface ClientInput {
  nom: string
  courriels?: string[]
  state: string
}
