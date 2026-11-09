import { HttpErrorResponse } from '@angular/common/http'
import { Component, inject, signal } from '@angular/core'
import { RouterLink } from '@angular/router'
import { LigneDeCommandeApiService } from '../api/ligne-de-commande-api.service'
import type { LigneDeCommande } from '../types/LigneDeCommande'

function messageOf(error: HttpErrorResponse): string {
  if (!error.status) return error.message
  const body = typeof error.error === 'string'
    ? error.error
    : JSON.stringify(error.error)
  return `${error.status} ${error.statusText}: ${body}`
}

@Component({
  selector: 'app-ligne-de-commande-list-page',
  imports: [RouterLink],
  template: `
    <section>
      <h1>LigneDeCommande list</h1>
      <a routerLink="/lignedecommandes/new">New</a>
      @if (error()) {
        <p class="error">{{ error() }}</p>
      }
      <table>
        <thead>
          <tr>
            <th>Quantite</th>
          </tr>
        </thead>
        <tbody>
          @for (item of items(); track item.id) {
            <tr>
              <td><a [routerLink]="['/lignedecommandes', item.id]">{{ item.quantite }}</a></td>
            </tr>
          }
        </tbody>
      </table>
    </section>
  `
})
export class LigneDeCommandeListPageComponent {
  private readonly ligneDeCommandeApi = inject(LigneDeCommandeApiService)
  protected readonly items = signal<LigneDeCommande[]>([])
  protected readonly error = signal<string | undefined>(undefined)

  constructor() {
    this.ligneDeCommandeApi.list().subscribe({
      next: (items) => this.items.set(items),
      error: (error: HttpErrorResponse) => this.fail(error)
    })
  }

  private fail(error: HttpErrorResponse): void {
    this.error.set(messageOf(error))
  }
}
