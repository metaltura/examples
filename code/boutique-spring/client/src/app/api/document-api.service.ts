import { HttpClient } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'
import { Observable } from 'rxjs'
import type { Document, DocumentInput } from '../types/Document'

const route = '/api/documents'

@Injectable({ providedIn: 'root' })
export class DocumentApiService {
  private readonly http = inject(HttpClient)

  list(): Observable<Document[]> {
    return this.http.get<Document[]>(route)
  }

  get(id: string): Observable<Document> {
    return this.http.get<Document>(`${route}/${encodeURIComponent(id)}`)
  }

  create(input: DocumentInput): Observable<Document> {
    return this.http.post<Document>(route, input)
  }

  update(id: string, input: DocumentInput): Observable<Document> {
    return this.http.put<Document>(`${route}/${encodeURIComponent(id)}`, input)
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${route}/${encodeURIComponent(id)}`)
  }
}
