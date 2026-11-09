import { HttpErrorResponse } from '@angular/common/http'
import { Component, inject, signal } from '@angular/core'
import { ActivatedRoute, Router, RouterLink } from '@angular/router'
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
  selector: 'app-client-detail-page',
  imports: [RouterLink],
  template: `
    <section>
      <h1>Client detail</h1>
      @if (error()) {
        <p class="error">{{ error() }}</p>
      }
      @if (item(); as item) {
        <dl>
          <dt>Nom</dt>
          <dd>{{ item.nom }}</dd>
          <dt>Courriels</dt>
          <dd>{{ (item.courriels ?? []).join(', ') }}</dd>
          <dt>State</dt>
          <dd>{{ item.state }}</dd>
        </dl>
      }
      <p>
        <a [routerLink]="['/clients', id, 'edit']">Edit</a>
        <a routerLink="/clients">List</a>
        <button type="button" (click)="remove()">
          Delete
        </button>
      </p>
    </section>
  `
})
export class ClientDetailPageComponent {
  private readonly route = inject(ActivatedRoute)
  private readonly router = inject(Router)
  private readonly clientApi = inject(ClientApiService)
  protected readonly id =
    this.route.snapshot.paramMap.get('id') ?? ''
  protected readonly item = signal<Client | undefined>(undefined)
  protected readonly error = signal<string | undefined>(undefined)

  constructor() {
    this.clientApi.get(this.id).subscribe({
      next: (item) => this.item.set(item),
      error: (error: HttpErrorResponse) => this.fail(error)
    })
  }

  protected remove(): void {
    this.clientApi.remove(this.id).subscribe({
      next: () => void this.router.navigate(['/clients']),
      error: (error: HttpErrorResponse) => this.fail(error)
    })
  }

  private fail(error: HttpErrorResponse): void {
    this.error.set(messageOf(error))
  }
}
