import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import * as LigneDeCommandeApi from '../api/LigneDeCommandeApi'
import type { LigneDeCommande } from '../types/LigneDeCommande'

export default function LigneDeCommandeDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [item, setItem] = useState<LigneDeCommande>()
  const [error, setError] = useState<string>()

  useEffect(() => {
    if (!id) return
    LigneDeCommandeApi.get(id)
      .then(setItem)
      .catch((e: Error) => setError(e.message))
  }, [id])

  function remove() {
    if (!id) return
    LigneDeCommandeApi.remove(id)
      .then(() => navigate("/lignedecommandes"))
      .catch((e: Error) => setError(e.message))
  }

  return (
    <section>
      <h1>LigneDeCommande detail</h1>
      {error && <p className="error">{error}</p>}
      {item && (
        <dl>
          <dt>Quantite</dt>
          <dd>{item.quantite}</dd>
          <dt>Commande id</dt>
          <dd>{item.commandeId}</dd>
          <dt>Created at</dt>
          <dd>{item.createdAt?.slice(0, 10)}</dd>
          <dt>Updated at</dt>
          <dd>{item.updatedAt?.slice(0, 10)}</dd>
          <dt>Created by</dt>
          <dd>{item.createdBy}</dd>
          <dt>Updated by</dt>
          <dd>{item.updatedBy}</dd>
        </dl>
      )}
      <p>
        <Link to={`/lignedecommandes/${id}/edit`}>Edit</Link>
        <Link to="/lignedecommandes">List</Link>
        <button type="button" onClick={remove}>
          Delete
        </button>
      </p>
    </section>
  )
}
