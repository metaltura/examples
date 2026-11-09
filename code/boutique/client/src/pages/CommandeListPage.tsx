import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import * as CommandeApi from '../api/CommandeApi'
import type { Commande } from '../types/Commande'

export default function CommandeListPage() {
  const [items, setItems] = useState<Commande[]>([])
  const [error, setError] = useState<string>()

  useEffect(() => {
    CommandeApi.list()
      .then(setItems)
      .catch((e: Error) => setError(e.message))
  }, [])

  return (
    <section>
      <h1>Commande list</h1>
      <Link to="/commandes/new">New</Link>
      {error && <p className="error">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Total</th>
            <th>Date</th>
            <th>Numero</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td><Link to={`/commandes/${item.id}`}>{item.total ?? '—'}</Link></td>
              <td>{item.date?.slice(0, 10)}</td>
              <td>{item.numero}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
