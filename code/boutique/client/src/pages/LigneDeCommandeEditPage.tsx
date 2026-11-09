import { useEffect, useState, type FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router'
import * as LigneDeCommandeApi from '../api/LigneDeCommandeApi'
import * as CommandeApi from '../api/CommandeApi'
import type { LigneDeCommandeInput, LigneDeCommande } from '../types/LigneDeCommande'
import type { Commande } from '../types/Commande'

interface Values {
  quantite: string
  commandeId: string
}

const EMPTY: Values = {
  quantite: '',
  commandeId: '',
}

function valuesOf(item: LigneDeCommande): Values {
  return {
    quantite: String(item.quantite ?? ''),
    commandeId: String(item.commandeId ?? ''),
  }
}

function inputOf(values: Values): LigneDeCommandeInput {
  return {
    quantite: Number(values.quantite),
    commandeId: values.commandeId,
  }
}

export default function LigneDeCommandeEditPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [values, setValues] = useState<Values>(EMPTY)
  const [commandeIdOptions, setCommandeIdOptions] = useState<Commande[]>([])
  const [error, setError] = useState<string>()

  useEffect(() => {
    CommandeApi.list()
      .then(setCommandeIdOptions)
      .catch((e: Error) => setError(e.message))
  }, [])

  useEffect(() => {
    if (!id) return
    LigneDeCommandeApi.get(id)
      .then((item) => setValues(valuesOf(item)))
      .catch((e: Error) => setError(e.message))
  }, [id])

  function change<K extends keyof Values>(name: K, value: Values[K]) {
    setValues((current) => ({ ...current, [name]: value }))
  }

  function submit(event: FormEvent) {
    event.preventDefault()
    LigneDeCommandeApi.update(id!, inputOf(values))
      .then((item) => navigate(`/lignedecommandes/${item.id}`))
      .catch((e: Error) => setError(e.message))
  }

  return (
    <section>
      <h1>LigneDeCommande edit</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={submit}>
        <label>
          Quantite
          <input
            type="number"
            step="any"
            value={values.quantite}
            required
            onChange={(e) => change('quantite', e.target.value)}
          />
        </label>
        <label>
          Commande id
          <select
            value={values.commandeId}
            required
            onChange={(e) => change('commandeId', e.target.value)}
          >
            <option value="">—</option>
            {commandeIdOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {String(option.total ?? option.id)}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Save</button>
      </form>
    </section>
  )
}
