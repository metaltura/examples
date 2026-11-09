import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import * as CommandeApi from '../api/CommandeApi'
import type { Commande } from '../types/Commande'

export default function CommandeDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [item, setItem] = useState<Commande>()
  const [error, setError] = useState<string>()

  useEffect(() => {
    if (!id) return
    CommandeApi.get(id)
      .then(setItem)
      .catch((e: Error) => setError(e.message))
  }, [id])

  function remove() {
    if (!id) return
    CommandeApi.remove(id)
      .then(() => navigate("/commandes"))
      .catch((e: Error) => setError(e.message))
  }

  return (
    <section>
      <h1>Commande detail</h1>
      {error && <p className="error">{error}</p>}
      {item && (
        <dl>
          <dt>Total</dt>
          <dd>{item.total}</dd>
          <dt>Date</dt>
          <dd>{item.date?.slice(0, 10)}</dd>
          <dt>Numero</dt>
          <dd>{item.numero}</dd>
          <dt>Client id</dt>
          <dd>{item.clientId}</dd>
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
        <Link to={`/commandes/${id}/edit`}>Edit</Link>
        <Link to="/commandes">List</Link>
        <button type="button" onClick={remove}>
          Delete
        </button>
      </p>
    </section>
  )
}
