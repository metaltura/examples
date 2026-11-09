import { HttpClient } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'
import { Observable } from 'rxjs'
import type { Commande, CommandeInput } from '../types/Commande'

const route = '/api/commandes'

@Injectable({ providedIn: 'root' })
export class CommandeApiService {
  private readonly http = inject(HttpClient)

  list(): Observable<Commande[]> {
    return this.http.get<Commande[]>(route)
  }

  get(id: string): Observable<Commande> {
    return this.http.get<Commande>(`${route}/${encodeURIComponent(id)}`)
  }

  create(input: CommandeInput): Observable<Commande> {
    return this.http.post<Commande>(route, input)
  }

  update(id: string, input: CommandeInput): Observable<Commande> {
    return this.http.put<Commande>(`${route}/${encodeURIComponent(id)}`, input)
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${route}/${encodeURIComponent(id)}`)
  }
}
