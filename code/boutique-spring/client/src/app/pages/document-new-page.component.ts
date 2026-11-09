import { HttpErrorResponse } from '@angular/common/http'
import { Component, inject, signal } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { DocumentApiService } from '../api/document-api.service'
import type { DocumentInput } from '../types/Document'

interface Values {
  numero: string
}

const EMPTY: Values = {
  numero: ''
}

function inputOf(values: Values): DocumentInput {
  return {
    numero: values.numero
  }
}

function messageOf(error: HttpErrorResponse): string {
  if (!error.status) return error.message
  const body = typeof error.error === 'string'
    ? error.error
    : JSON.stringify(error.error)
  return `${error.status} ${error.statusText}: ${body}`
}

@Component({
  selector: 'app-document-new-page',
  imports: [FormsModule],
  template: `
    <section>
      <h1>Document new</h1>
      @if (error()) {
        <p class="error">{{ error() }}</p>
      }
      <form ngNativeValidate (ngSubmit)="submit()">
        <label>
          Numero
          <input
            type="text"
            name="numero"
            [ngModel]="values().numero"
            (ngModelChange)="change('numero', $event)"
            required
          />
        </label>
        <button type="submit">Save</button>
      </form>
    </section>
  `
})
export class DocumentNewPageComponent {
  private readonly router = inject(Router)
  private readonly documentApi = inject(DocumentApiService)
  protected readonly values = signal<Values>(EMPTY)
  protected readonly error = signal<string | undefined>(undefined)

  constructor() {
  }

  protected change<K extends keyof Values>(
    name: K,
    value: Values[K]
  ): void {
    this.values.update((current) => ({ ...current, [name]: value }))
  }

  protected submit(): void {
    this.documentApi.create(inputOf(this.values())).subscribe({
      next: (item) => void this.router.navigate(['/documents', item.id]),
      error: (error: HttpErrorResponse) => this.fail(error)
    })
  }

  private fail(error: HttpErrorResponse): void {
    this.error.set(messageOf(error))
  }
}
