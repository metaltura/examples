import { HttpErrorResponse } from '@angular/common/http'
import { Component, inject, signal } from '@angular/core'
import { RouterLink } from '@angular/router'
import { ClientApiService } from '../api/client-api.service'
import type { Client } from '../types/Client'

function messageOf(error: HttpErrorResponse): string {
  if (!error.status) return error.message
  const body = typeof error.error === 'string'
    ? error.error
    : JSON.stringify(error.error)
  return `${error.status} ${error.statusText}: ${body}`
}

@Component({
  selector: 'app-client-list-page',
  imports: [RouterLink],
  template: `
    <section>
      <h1>Client list</h1>
      <a routerLink="/clients/new">New</a>
      @if (error()) {
        <p class="error">{{ error() }}</p>
      }
      <table>
        <thead>
          <tr>
            <th>Nom</th>
          </tr>
        </thead>
        <tbody>
          @for (item of items(); track item.id) {
            <tr>
              <td><a [routerLink]="['/clients', item.id]">{{ item.nom }}</a></td>
            </tr>
          }
        </tbody>
      </table>
    </section>
  `
})
export class ClientListPageComponent {
  private readonly clientApi = inject(ClientApiService)
  protected readonly items = signal<Client[]>([])
  protected readonly error = signal<string | undefined>(undefined)

  constructor() {
    this.clientApi.list().subscribe({
      next: (items) => this.items.set(items),
      error: (error: HttpErrorResponse) => this.fail(error)
    })
  }

  private fail(error: HttpErrorResponse): void {
    this.error.set(messageOf(error))
  }
}
