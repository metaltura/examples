import { useEffect, useState, type FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router'
import * as CommandeApi from '../api/CommandeApi'
import * as ClientApi from '../api/ClientApi'
import type { CommandeInput, Commande } from '../types/Commande'
import type { Client } from '../types/Client'

interface Values {
  total: string
  date: string
  numero: string
  clientId: string
}

const EMPTY: Values = {
  total: '',
  date: '',
  numero: '',
  clientId: '',
}

function valuesOf(item: Commande): Values {
  return {
    total: String(item.total ?? ''),
    date: (item.date ?? '').slice(0, 10),
    numero: String(item.numero ?? ''),
    clientId: String(item.clientId ?? ''),
  }
}

function inputOf(values: Values): CommandeInput {
  return {
    total: values.total === '' ? undefined : Number(values.total),
    date: `${values.date}T00:00:00.000Z`,
    numero: values.numero,
    clientId: values.clientId,
  }
}

export default function CommandeEditPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [values, setValues] = useState<Values>(EMPTY)
  const [clientIdOptions, setClientIdOptions] = useState<Client[]>([])
  const [error, setError] = useState<string>()

  useEffect(() => {
    ClientApi.list()
      .then(setClientIdOptions)
      .catch((e: Error) => setError(e.message))
  }, [])

  useEffect(() => {
    if (!id) return
    CommandeApi.get(id)
      .then((item) => setValues(valuesOf(item)))
      .catch((e: Error) => setError(e.message))
  }, [id])

  function change<K extends keyof Values>(name: K, value: Values[K]) {
    setValues((current) => ({ ...current, [name]: value }))
  }

  function submit(event: FormEvent) {
    event.preventDefault()
    CommandeApi.update(id!, inputOf(values))
      .then((item) => navigate(`/commandes/${item.id}`))
      .catch((e: Error) => setError(e.message))
  }

  return (
    <section>
      <h1>Commande edit</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={submit}>
        <label>
          Total
          <input
            type="number"
            step="any"
            value={values.total}
            onChange={(e) => change('total', e.target.value)}
          />
        </label>
        <label>
          Date
          <input
            type="date"
            value={values.date}
            required
            onChange={(e) => change('date', e.target.value)}
          />
        </label>
        <label>
          Numero
          <input
            type="text"
            value={values.numero}
            required
            onChange={(e) => change('numero', e.target.value)}
          />
        </label>
        <label>
          Client id
          <select
            value={values.clientId}
            required
            onChange={(e) => change('clientId', e.target.value)}
          >
            <option value="">—</option>
            {clientIdOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {String(option.nom ?? option.id)}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Save</button>
      </form>
    </section>
  )
}
