import { HttpErrorResponse } from '@angular/common/http'
import { Component, inject, signal } from '@angular/core'
import { RouterLink } from '@angular/router'
import { CommandeApiService } from '../api/commande-api.service'
import type { Commande } from '../types/Commande'

function messageOf(error: HttpErrorResponse): string {
  if (!error.status) return error.message
  const body = typeof error.error === 'string'
    ? error.error
    : JSON.stringify(error.error)
  return `${error.status} ${error.statusText}: ${body}`
}

@Component({
  selector: 'app-commande-list-page',
  imports: [RouterLink],
  template: `
    <section>
      <h1>Commande list</h1>
      <a routerLink="/commandes/new">New</a>
      @if (error()) {
        <p class="error">{{ error() }}</p>
      }
      <table>
        <thead>
          <tr>
            <th>Total</th>
            <th>Date</th>
            <th>Numero</th>
          </tr>
        </thead>
        <tbody>
          @for (item of items(); track item.id) {
            <tr>
              <td><a [routerLink]="['/commandes', item.id]">{{ item.total ?? '—' }}</a></td>
              <td>{{ item.date.slice(0, 10) }}</td>
              <td>{{ item.numero }}</td>
            </tr>
          }
        </tbody>
      </table>
    </section>
  `
})
export class CommandeListPageComponent {
  private readonly commandeApi = inject(CommandeApiService)
  protected readonly items = signal<Commande[]>([])
  protected readonly error = signal<string | undefined>(undefined)

  constructor() {
    this.commandeApi.list().subscribe({
      next: (items) => this.items.set(items),
      error: (error: HttpErrorResponse) => this.fail(error)
    })
  }

  private fail(error: HttpErrorResponse): void {
    this.error.set(messageOf(error))
  }
}
