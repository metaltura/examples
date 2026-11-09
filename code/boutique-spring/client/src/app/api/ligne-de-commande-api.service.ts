import { HttpClient } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'
import { Observable } from 'rxjs'
import type { LigneDeCommande, LigneDeCommandeInput } from '../types/LigneDeCommande'

const route = '/api/lignedecommandes'

@Injectable({ providedIn: 'root' })
export class LigneDeCommandeApiService {
  private readonly http = inject(HttpClient)

  list(): Observable<LigneDeCommande[]> {
    return this.http.get<LigneDeCommande[]>(route)
  }

  get(id: string): Observable<LigneDeCommande> {
    return this.http.get<LigneDeCommande>(`${route}/${encodeURIComponent(id)}`)
  }

  create(input: LigneDeCommandeInput): Observable<LigneDeCommande> {
    return this.http.post<LigneDeCommande>(route, input)
  }

  update(id: string, input: LigneDeCommandeInput): Observable<LigneDeCommande> {
    return this.http.put<LigneDeCommande>(`${route}/${encodeURIComponent(id)}`, input)
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${route}/${encodeURIComponent(id)}`)
  }
}
