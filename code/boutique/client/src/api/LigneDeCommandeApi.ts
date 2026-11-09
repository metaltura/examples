import type { LigneDeCommande, LigneDeCommandeInput } from '../types/LigneDeCommande'

const route = '/api/lignedecommandes'

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

export function list(): Promise<LigneDeCommande[]> {
  return request<LigneDeCommande[]>(route)
}

export function get(id: string): Promise<LigneDeCommande> {
  return request<LigneDeCommande>(`${route}/${encodeURIComponent(id)}`)
}

export function create(input: LigneDeCommandeInput): Promise<LigneDeCommande> {
  return request<LigneDeCommande>(route, {
    method: 'POST',
    body: JSON.stringify(input)
  })
}

export function update(id: string, input: LigneDeCommandeInput): Promise<LigneDeCommande> {
  return request<LigneDeCommande>(`${route}/${encodeURIComponent(id)}`, {
    method: 'PUT',
    body: JSON.stringify(input)
  })
}

export function remove(id: string): Promise<void> {
  return request<void>(`${route}/${encodeURIComponent(id)}`, {
    method: 'DELETE'
  })
}
