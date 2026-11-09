import { HttpErrorResponse } from '@angular/common/http'
import { Component, inject, signal } from '@angular/core'
import { ActivatedRoute, Router, RouterLink } from '@angular/router'
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
  selector: 'app-ligne-de-commande-detail-page',
  imports: [RouterLink],
  template: `
    <section>
      <h1>LigneDeCommande detail</h1>
      @if (error()) {
        <p class="error">{{ error() }}</p>
      }
      @if (item(); as item) {
        <dl>
          <dt>Quantite</dt>
          <dd>{{ item.quantite }}</dd>
          <dt>Commande id</dt>
          <dd>{{ item.commandeId }}</dd>
        </dl>
      }
      <p>
        <a [routerLink]="['/lignedecommandes', id, 'edit']">Edit</a>
        <a routerLink="/lignedecommandes">List</a>
        <button type="button" (click)="remove()">
          Delete
        </button>
      </p>
    </section>
  `
})
export class LigneDeCommandeDetailPageComponent {
  private readonly route = inject(ActivatedRoute)
  private readonly router = inject(Router)
  private readonly ligneDeCommandeApi = inject(LigneDeCommandeApiService)
  protected readonly id =
    this.route.snapshot.paramMap.get('id') ?? ''
  protected readonly item = signal<LigneDeCommande | undefined>(undefined)
  protected readonly error = signal<string | undefined>(undefined)

  constructor() {
    this.ligneDeCommandeApi.get(this.id).subscribe({
      next: (item) => this.item.set(item),
      error: (error: HttpErrorResponse) => this.fail(error)
    })
  }

  protected remove(): void {
    this.ligneDeCommandeApi.remove(this.id).subscribe({
      next: () => void this.router.navigate(['/lignedecommandes']),
      error: (error: HttpErrorResponse) => this.fail(error)
    })
  }

  private fail(error: HttpErrorResponse): void {
    this.error.set(messageOf(error))
  }
}
