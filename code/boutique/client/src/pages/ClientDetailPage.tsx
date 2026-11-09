import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import * as ClientApi from '../api/ClientApi'
import type { Client } from '../types/Client'

export default function ClientDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [item, setItem] = useState<Client>()
  const [error, setError] = useState<string>()

  useEffect(() => {
    if (!id) return
    ClientApi.get(id)
      .then(setItem)
      .catch((e: Error) => setError(e.message))
  }, [id])

  function remove() {
    if (!id) return
    ClientApi.remove(id)
      .then(() => navigate("/clients"))
      .catch((e: Error) => setError(e.message))
  }

  return (
    <section>
      <h1>Client detail</h1>
      {error && <p className="error">{error}</p>}
      {item && (
        <dl>
          <dt>Nom</dt>
          <dd>{item.nom}</dd>
          <dt>Courriels</dt>
          <dd>{(item.courriels ?? []).join(', ')}</dd>
          <dt>State</dt>
          <dd>{item.state}</dd>
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
        <Link to={`/clients/${id}/edit`}>Edit</Link>
        <Link to="/clients">List</Link>
        <button type="button" onClick={remove}>
          Delete
        </button>
      </p>
    </section>
  )
}
