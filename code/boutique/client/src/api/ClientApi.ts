import type { Client, ClientInput } from '../types/Client'

const route = '/api/clients'

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

export function list(): Promise<Client[]> {
  return request<Client[]>(route)
}

export function get(id: string): Promise<Client> {
  return request<Client>(`${route}/${encodeURIComponent(id)}`)
}

export function create(input: ClientInput): Promise<Client> {
  return request<Client>(route, {
    method: 'POST',
    body: JSON.stringify(input)
  })
}

export function update(id: string, input: ClientInput): Promise<Client> {
  return request<Client>(`${route}/${encodeURIComponent(id)}`, {
    method: 'PUT',
    body: JSON.stringify(input)
  })
}

export function remove(id: string): Promise<void> {
  return request<void>(`${route}/${encodeURIComponent(id)}`, {
    method: 'DELETE'
  })
}
