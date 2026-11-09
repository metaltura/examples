export interface LigneDeCommande {
  id: string
  quantite: number
  commandeId: string
}

export interface LigneDeCommandeInput {
  quantite: number
  commandeId: string
}
