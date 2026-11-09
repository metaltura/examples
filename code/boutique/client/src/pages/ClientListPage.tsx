import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import * as ClientApi from '../api/ClientApi'
import type { Client } from '../types/Client'

export default function ClientListPage() {
  const [items, setItems] = useState<Client[]>([])
  const [error, setError] = useState<string>()

  useEffect(() => {
    ClientApi.list()
      .then(setItems)
      .catch((e: Error) => setError(e.message))
  }, [])

  return (
    <section>
      <h1>Client list</h1>
      <Link to="/clients/new">New</Link>
      {error && <p className="error">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Nom</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td><Link to={`/clients/${item.id}`}>{item.nom ?? '—'}</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
