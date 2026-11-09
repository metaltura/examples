import { useEffect, useState, type FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router'
import * as ClientApi from '../api/ClientApi'
import type { ClientInput, Client } from '../types/Client'

interface Values {
  nom: string
  courriels: string
  state: string
}

const EMPTY: Values = {
  nom: '',
  courriels: '',
  state: '',
}

function valuesOf(item: Client): Values {
  return {
    nom: String(item.nom ?? ''),
    courriels: (item.courriels ?? []).join('\n'),
    state: String(item.state ?? ''),
  }
}

function inputOf(values: Values): ClientInput {
  return {
    nom: values.nom,
    courriels: values.courriels.split('\n').map((s) => s.trim()).filter(Boolean),
    state: values.state,
  }
}

export default function ClientEditPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [values, setValues] = useState<Values>(EMPTY)
  const [error, setError] = useState<string>()

  useEffect(() => {
    if (!id) return
    ClientApi.get(id)
      .then((item) => setValues(valuesOf(item)))
      .catch((e: Error) => setError(e.message))
  }, [id])

  function change<K extends keyof Values>(name: K, value: Values[K]) {
    setValues((current) => ({ ...current, [name]: value }))
  }

  function submit(event: FormEvent) {
    event.preventDefault()
    ClientApi.update(id!, inputOf(values))
      .then((item) => navigate(`/clients/${item.id}`))
      .catch((e: Error) => setError(e.message))
  }

  return (
    <section>
      <h1>Client edit</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={submit}>
        <label>
          Nom
          <input
            type="text"
            value={values.nom}
            required
            onChange={(e) => change('nom', e.target.value)}
          />
        </label>
        <label>
          Courriels
          <textarea
            value={values.courriels}
            onChange={(e) => change('courriels', e.target.value)}
          />
        </label>
        <label>
          State
          <input
            type="text"
            value={values.state}
            required
            onChange={(e) => change('state', e.target.value)}
          />
        </label>
        <button type="submit">Save</button>
      </form>
    </section>
  )
}
