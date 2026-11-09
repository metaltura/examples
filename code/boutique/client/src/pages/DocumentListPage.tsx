import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import * as DocumentApi from '../api/DocumentApi'
import type { Document } from '../types/Document'

export default function DocumentListPage() {
  const [items, setItems] = useState<Document[]>([])
  const [error, setError] = useState<string>()

  useEffect(() => {
    DocumentApi.list()
      .then(setItems)
      .catch((e: Error) => setError(e.message))
  }, [])

  return (
    <section>
      <h1>Document list</h1>
      <Link to="/documents/new">New</Link>
      {error && <p className="error">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Numero</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td><Link to={`/documents/${item.id}`}>{item.numero ?? '—'}</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
