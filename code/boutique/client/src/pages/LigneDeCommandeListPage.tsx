import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import * as LigneDeCommandeApi from '../api/LigneDeCommandeApi'
import type { LigneDeCommande } from '../types/LigneDeCommande'

export default function LigneDeCommandeListPage() {
  const [items, setItems] = useState<LigneDeCommande[]>([])
  const [error, setError] = useState<string>()

  useEffect(() => {
    LigneDeCommandeApi.list()
      .then(setItems)
      .catch((e: Error) => setError(e.message))
  }, [])

  return (
    <section>
      <h1>LigneDeCommande list</h1>
      <Link to="/lignedecommandes/new">New</Link>
      {error && <p className="error">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Quantite</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td><Link to={`/lignedecommandes/${item.id}`}>{item.quantite ?? '—'}</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
