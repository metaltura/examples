import { useEffect, useState, type FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router'
import * as DocumentApi from '../api/DocumentApi'
import type { DocumentInput, Document } from '../types/Document'

interface Values {
  numero: string
}

const EMPTY: Values = {
  numero: '',
}

function valuesOf(item: Document): Values {
  return {
    numero: String(item.numero ?? ''),
  }
}

function inputOf(values: Values): DocumentInput {
  return {
    numero: values.numero,
  }
}

export default function DocumentEditPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [values, setValues] = useState<Values>(EMPTY)
  const [error, setError] = useState<string>()

  useEffect(() => {
    if (!id) return
    DocumentApi.get(id)
      .then((item) => setValues(valuesOf(item)))
      .catch((e: Error) => setError(e.message))
  }, [id])

  function change<K extends keyof Values>(name: K, value: Values[K]) {
    setValues((current) => ({ ...current, [name]: value }))
  }

  function submit(event: FormEvent) {
    event.preventDefault()
    DocumentApi.update(id!, inputOf(values))
      .then((item) => navigate(`/documents/${item.id}`))
      .catch((e: Error) => setError(e.message))
  }

  return (
    <section>
      <h1>Document edit</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={submit}>
        <label>
          Numero
          <input
            type="text"
            value={values.numero}
            required
            onChange={(e) => change('numero', e.target.value)}
          />
        </label>
        <button type="submit">Save</button>
      </form>
    </section>
  )
}
