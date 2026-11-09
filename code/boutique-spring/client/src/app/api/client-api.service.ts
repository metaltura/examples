import { HttpClient } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'
import { Observable } from 'rxjs'
import type { Client, ClientInput } from '../types/Client'

const route = '/api/clients'

@Injectable({ providedIn: 'root' })
export class ClientApiService {
  private readonly http = inject(HttpClient)

  list(): Observable<Client[]> {
    return this.http.get<Client[]>(route)
  }

  get(id: string): Observable<Client> {
    return this.http.get<Client>(`${route}/${encodeURIComponent(id)}`)
  }

  create(input: ClientInput): Observable<Client> {
    return this.http.post<Client>(route, input)
  }

  update(id: string, input: ClientInput): Observable<Client> {
    return this.http.put<Client>(`${route}/${encodeURIComponent(id)}`, input)
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${route}/${encodeURIComponent(id)}`)
  }
}
