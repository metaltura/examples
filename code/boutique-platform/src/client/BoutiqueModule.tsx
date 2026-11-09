// The module boutique of the application: its buttons and its routes.
// Generated from the model: change the model, not this file.
import type { ModuleProps } from '@kogitec/core/client'
import { Client, Commande, Document, LigneDeCommande } from '../common/entities'
import { EntityScreen } from './EntityScreen'

export const BoutiqueModule: ModuleProps = {
  name: 'boutique',
  title: 'boutique:boutique.title',
  buttons: [
    { title: 'boutique:boutique.Document.title', path: '/boutique/documents' },
    { title: 'boutique:boutique.Client.title', path: '/boutique/clients' },
    { title: 'boutique:boutique.Commande.title', path: '/boutique/commandes' },
    { title: 'boutique:boutique.LigneDeCommande.title', path: '/boutique/lignedecommandes' }
  ],
  route: {
    path: 'boutique',
    children: [
      {
        path: 'documents',
        children: [
          {
            index: true,
            element: (
              <EntityScreen title='boutique:boutique.route.Document.entityScreen.title' entity={Document} />
            )
          }
        ]
      },
      {
        path: 'clients',
        children: [
          {
            index: true,
            element: (
              <EntityScreen title='boutique:boutique.route.Client.entityScreen.title' entity={Client} />
            )
          }
        ]
      },
      {
        path: 'commandes',
        children: [
          {
            index: true,
            element: (
              <EntityScreen title='boutique:boutique.route.Commande.entityScreen.title' entity={Commande} />
            )
          }
        ]
      },
      {
        path: 'lignedecommandes',
        children: [
          {
            index: true,
            element: (
              <EntityScreen title='boutique:boutique.route.LigneDeCommande.entityScreen.title' entity={LigneDeCommande} />
            )
          }
        ]
      }
    ]
  }
}
