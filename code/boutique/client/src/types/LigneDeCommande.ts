export interface LigneDeCommande {
  id: string
  quantite: number
  commandeId: string
  createdAt?: string
  updatedAt?: string
  createdBy?: string
  updatedBy?: string
}

export interface LigneDeCommandeInput {
  quantite: number
  commandeId: string
}
