import { HttpErrorResponse } from '@angular/common/http'
import { Component, inject, signal } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { ClientApiService } from '../api/client-api.service'
import type { ClientInput } from '../types/Client'

interface Values {
  nom: string
  courriels: string
  state: string
}

const EMPTY: Values = {
  nom: '',
  courriels: '',
  state: ''
}

function inputOf(values: Values): ClientInput {
  return {
    nom: values.nom,
    courriels: values.courriels.split('\n').map((s) => s.trim()).filter(Boolean),
    state: values.state
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
  selector: 'app-client-new-page',
  imports: [FormsModule],
  template: `
    <section>
      <h1>Client new</h1>
      @if (error()) {
        <p class="error">{{ error() }}</p>
      }
      <form ngNativeValidate (ngSubmit)="submit()">
        <label>
          Nom
          <input
            type="text"
            name="nom"
            [ngModel]="values().nom"
            (ngModelChange)="change('nom', $event)"
            required
          />
        </label>
        <label>
          Courriels
          <textarea
            name="courriels"
            [ngModel]="values().courriels"
            (ngModelChange)="change('courriels', $event)"
          ></textarea>
        </label>
        <label>
          State
          <input
            type="text"
            name="state"
            [ngModel]="values().state"
            (ngModelChange)="change('state', $event)"
            required
          />
        </label>
        <button type="submit">Save</button>
      </form>
    </section>
  `
})
export class ClientNewPageComponent {
  private readonly router = inject(Router)
  private readonly clientApi = inject(ClientApiService)
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
    this.clientApi.create(inputOf(this.values())).subscribe({
      next: (item) => void this.router.navigate(['/clients', item.id]),
      error: (error: HttpErrorResponse) => this.fail(error)
    })
  }

  private fail(error: HttpErrorResponse): void {
    this.error.set(messageOf(error))
  }
}
