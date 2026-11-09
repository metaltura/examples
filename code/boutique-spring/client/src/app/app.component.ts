import { Component } from '@angular/core'
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router'

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    <nav style="background: #37474f">
      <strong>Boutique</strong>
      <a routerLink="/documents" routerLinkActive="active">Document</a>
      <a routerLink="/clients" routerLinkActive="active">Client</a>
      <a routerLink="/commandes" routerLinkActive="active">Commande</a>
      <a routerLink="/lignedecommandes" routerLinkActive="active">LigneDeCommande</a>
    </nav>
    <main>
      <router-outlet />
    </main>
  `
})
export class AppComponent {}
