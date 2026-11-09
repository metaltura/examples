import { HttpErrorResponse } from '@angular/common/http'
import { Component, inject, signal } from '@angular/core'
import { RouterLink } from '@angular/router'
import { DocumentApiService } from '../api/document-api.service'
import type { Document } from '../types/Document'

function messageOf(error: HttpErrorResponse): string {
  if (!error.status) return error.message
  const body = typeof error.error === 'string'
    ? error.error
    : JSON.stringify(error.error)
  return `${error.status} ${error.statusText}: ${body}`
}

@Component({
  selector: 'app-document-list-page',
  imports: [RouterLink],
  template: `
    <section>
      <h1>Document list</h1>
      <a routerLink="/documents/new">New</a>
      @if (error()) {
        <p class="error">{{ error() }}</p>
      }
      <table>
        <thead>
          <tr>
            <th>Numero</th>
          </tr>
        </thead>
        <tbody>
          @for (item of items(); track item.id) {
            <tr>
              <td><a [routerLink]="['/documents', item.id]">{{ item.numero }}</a></td>
            </tr>
          }
        </tbody>
      </table>
    </section>
  `
})
export class DocumentListPageComponent {
  private readonly documentApi = inject(DocumentApiService)
  protected readonly items = signal<Document[]>([])
  protected readonly error = signal<string | undefined>(undefined)

  constructor() {
    this.documentApi.list().subscribe({
      next: (items) => this.items.set(items),
      error: (error: HttpErrorResponse) => this.fail(error)
    })
  }

  private fail(error: HttpErrorResponse): void {
    this.error.set(messageOf(error))
  }
}
