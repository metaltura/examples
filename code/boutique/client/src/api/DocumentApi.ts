import type { Document, DocumentInput } from '../types/Document'

const route = '/api/documents'

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(path, {
    headers: { 'Content-Type': 'application/json' },
    ...init
  })
  const body = await response.text()
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}: ${body}`)
  }
  return (body ? JSON.parse(body) : undefined) as T
}

export function list(): Promise<Document[]> {
  return request<Document[]>(route)
}

export function get(id: string): Promise<Document> {
  return request<Document>(`${route}/${encodeURIComponent(id)}`)
}

export function create(input: DocumentInput): Promise<Document> {
  return request<Document>(route, {
    method: 'POST',
    body: JSON.stringify(input)
  })
}

export function update(id: string, input: DocumentInput): Promise<Document> {
  return request<Document>(`${route}/${encodeURIComponent(id)}`, {
    method: 'PUT',
    body: JSON.stringify(input)
  })
}

export function remove(id: string): Promise<void> {
  return request<void>(`${route}/${encodeURIComponent(id)}`, {
    method: 'DELETE'
  })
}
