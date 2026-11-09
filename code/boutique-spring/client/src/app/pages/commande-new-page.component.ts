import { HttpErrorResponse } from '@angular/common/http'
import { Component, inject, signal } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { CommandeApiService } from '../api/commande-api.service'
import { ClientApiService } from '../api/client-api.service'
import type { CommandeInput } from '../types/Commande'
import type { Client } from '../types/Client'

interface Values {
  total: number | null
  date: string
  numero: string
  clientId: string
}

const EMPTY: Values = {
  total: null,
  date: '',
  numero: '',
  clientId: ''
}

function inputOf(values: Values): CommandeInput {
  return {
    total: values.total ?? undefined,
    date: `${values.date}T00:00:00.000Z`,
    numero: values.numero,
    clientId: values.clientId
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
  selector: 'app-commande-new-page',
  imports: [FormsModule],
  template: `
    <section>
      <h1>Commande new</h1>
      @if (error()) {
        <p class="error">{{ error() }}</p>
      }
      <form ngNativeValidate (ngSubmit)="submit()">
        <label>
          Total
          <input
            type="number"
            step="any"
            name="total"
            [ngModel]="values().total"
            (ngModelChange)="change('total', $event)"
          />
        </label>
        <label>
          Date
          <input
            type="date"
            name="date"
            [ngModel]="values().date"
            (ngModelChange)="change('date', $event)"
            required
          />
        </label>
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
        <label>
          Client id
          <select
            name="clientId"
            [ngModel]="values().clientId"
            (ngModelChange)="change('clientId', $event)"
            required
          >
            <option value="">—</option>
            @for (option of clientIdOptions(); track option.id) {
              <option [value]="option.id">
                {{ option.nom }}
              </option>
            }
          </select>
        </label>
        <button type="submit">Save</button>
      </form>
    </section>
  `
})
export class CommandeNewPageComponent {
  private readonly router = inject(Router)
  private readonly commandeApi = inject(CommandeApiService)
  private readonly clientApi = inject(ClientApiService)
  protected readonly values = signal<Values>(EMPTY)
  protected readonly clientIdOptions = signal<Client[]>([])
  protected readonly error = signal<string | undefined>(undefined)

  constructor() {
    this.clientApi.list().subscribe({
      next: (items) => this.clientIdOptions.set(items),
      error: (error: HttpErrorResponse) => this.fail(error)
    })
  }

  protected change<K extends keyof Values>(
    name: K,
    value: Values[K]
  ): void {
    this.values.update((current) => ({ ...current, [name]: value }))
  }

  protected submit(): void {
    this.commandeApi.create(inputOf(this.values())).subscribe({
      next: (item) => void this.router.navigate(['/commandes', item.id]),
      error: (error: HttpErrorResponse) => this.fail(error)
    })
  }

  private fail(error: HttpErrorResponse): void {
    this.error.set(messageOf(error))
  }
}
