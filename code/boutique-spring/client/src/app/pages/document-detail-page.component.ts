import { HttpErrorResponse } from '@angular/common/http'
import { Component, inject, signal } from '@angular/core'
import { ActivatedRoute, Router, RouterLink } from '@angular/router'
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
  selector: 'app-document-detail-page',
  imports: [RouterLink],
  template: `
    <section>
      <h1>Document detail</h1>
      @if (error()) {
        <p class="error">{{ error() }}</p>
      }
      @if (item(); as item) {
        <dl>
          <dt>Numero</dt>
          <dd>{{ item.numero }}</dd>
        </dl>
      }
      <p>
        <a [routerLink]="['/documents', id, 'edit']">Edit</a>
        <a routerLink="/documents">List</a>
        <button type="button" (click)="remove()">
          Delete
        </button>
      </p>
    </section>
  `
})
export class DocumentDetailPageComponent {
  private readonly route = inject(ActivatedRoute)
  private readonly router = inject(Router)
  private readonly documentApi = inject(DocumentApiService)
  protected readonly id =
    this.route.snapshot.paramMap.get('id') ?? ''
  protected readonly item = signal<Document | undefined>(undefined)
  protected readonly error = signal<string | undefined>(undefined)

  constructor() {
    this.documentApi.get(this.id).subscribe({
      next: (item) => this.item.set(item),
      error: (error: HttpErrorResponse) => this.fail(error)
    })
  }

  protected remove(): void {
    this.documentApi.remove(this.id).subscribe({
      next: () => void this.router.navigate(['/documents']),
      error: (error: HttpErrorResponse) => this.fail(error)
    })
  }

  private fail(error: HttpErrorResponse): void {
    this.error.set(messageOf(error))
  }
}
