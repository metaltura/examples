import { HttpErrorResponse } from '@angular/common/http'
import { Component, inject, signal } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { LigneDeCommandeApiService } from '../api/ligne-de-commande-api.service'
import { CommandeApiService } from '../api/commande-api.service'
import type { LigneDeCommandeInput } from '../types/LigneDeCommande'
import type { Commande } from '../types/Commande'

interface Values {
  quantite: number | null
  commandeId: string
}

const EMPTY: Values = {
  quantite: null,
  commandeId: ''
}

function inputOf(values: Values): LigneDeCommandeInput {
  return {
    quantite: Number(values.quantite),
    commandeId: values.commandeId
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
  selector: 'app-ligne-de-commande-new-page',
  imports: [FormsModule],
  template: `
    <section>
      <h1>LigneDeCommande new</h1>
      @if (error()) {
        <p class="error">{{ error() }}</p>
      }
      <form ngNativeValidate (ngSubmit)="submit()">
        <label>
          Quantite
          <input
            type="number"
            step="any"
            name="quantite"
            [ngModel]="values().quantite"
            (ngModelChange)="change('quantite', $event)"
            required
          />
        </label>
        <label>
          Commande id
          <select
            name="commandeId"
            [ngModel]="values().commandeId"
            (ngModelChange)="change('commandeId', $event)"
            required
          >
            <option value="">—</option>
            @for (option of commandeIdOptions(); track option.id) {
              <option [value]="option.id">
                {{ option.total ?? option.id }}
              </option>
            }
          </select>
        </label>
        <button type="submit">Save</button>
      </form>
    </section>
  `
})
export class LigneDeCommandeNewPageComponent {
  private readonly router = inject(Router)
  private readonly ligneDeCommandeApi = inject(LigneDeCommandeApiService)
  private readonly commandeApi = inject(CommandeApiService)
  protected readonly values = signal<Values>(EMPTY)
  protected readonly commandeIdOptions = signal<Commande[]>([])
  protected readonly error = signal<string | undefined>(undefined)

  constructor() {
    this.commandeApi.list().subscribe({
      next: (items) => this.commandeIdOptions.set(items),
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
    this.ligneDeCommandeApi.create(inputOf(this.values())).subscribe({
      next: (item) => void this.router.navigate(['/lignedecommandes', item.id]),
      error: (error: HttpErrorResponse) => this.fail(error)
    })
  }

  private fail(error: HttpErrorResponse): void {
    this.error.set(messageOf(error))
  }
}
