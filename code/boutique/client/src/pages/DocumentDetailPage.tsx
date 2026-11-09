import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import * as DocumentApi from '../api/DocumentApi'
import type { Document } from '../types/Document'

export default function DocumentDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [item, setItem] = useState<Document>()
  const [error, setError] = useState<string>()

  useEffect(() => {
    if (!id) return
    DocumentApi.get(id)
      .then(setItem)
      .catch((e: Error) => setError(e.message))
  }, [id])

  function remove() {
    if (!id) return
    DocumentApi.remove(id)
      .then(() => navigate("/documents"))
      .catch((e: Error) => setError(e.message))
  }

  return (
    <section>
      <h1>Document detail</h1>
      {error && <p className="error">{error}</p>}
      {item && (
        <dl>
          <dt>Numero</dt>
          <dd>{item.numero}</dd>
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
        <Link to={`/documents/${id}/edit`}>Edit</Link>
        <Link to="/documents">List</Link>
        <button type="button" onClick={remove}>
          Delete
        </button>
      </p>
    </section>
  )
}
