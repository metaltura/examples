import { HttpErrorResponse } from '@angular/common/http'
import { Component, inject, signal } from '@angular/core'
import { ActivatedRoute, Router, RouterLink } from '@angular/router'
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
  selector: 'app-commande-detail-page',
  imports: [RouterLink],
  template: `
    <section>
      <h1>Commande detail</h1>
      @if (error()) {
        <p class="error">{{ error() }}</p>
      }
      @if (item(); as item) {
        <dl>
          <dt>Total</dt>
          <dd>{{ item.total }}</dd>
          <dt>Date</dt>
          <dd>{{ item.date.slice(0, 10) }}</dd>
          <dt>Numero</dt>
          <dd>{{ item.numero }}</dd>
          <dt>Client id</dt>
          <dd>{{ item.clientId }}</dd>
        </dl>
      }
      <p>
        <a [routerLink]="['/commandes', id, 'edit']">Edit</a>
        <a routerLink="/commandes">List</a>
        <button type="button" (click)="remove()">
          Delete
        </button>
      </p>
    </section>
  `
})
export class CommandeDetailPageComponent {
  private readonly route = inject(ActivatedRoute)
  private readonly router = inject(Router)
  private readonly commandeApi = inject(CommandeApiService)
  protected readonly id =
    this.route.snapshot.paramMap.get('id') ?? ''
  protected readonly item = signal<Commande | undefined>(undefined)
  protected readonly error = signal<string | undefined>(undefined)

  constructor() {
    this.commandeApi.get(this.id).subscribe({
      next: (item) => this.item.set(item),
      error: (error: HttpErrorResponse) => this.fail(error)
    })
  }

  protected remove(): void {
    this.commandeApi.remove(this.id).subscribe({
      next: () => void this.router.navigate(['/commandes']),
      error: (error: HttpErrorResponse) => this.fail(error)
    })
  }

  private fail(error: HttpErrorResponse): void {
    this.error.set(messageOf(error))
  }
}
