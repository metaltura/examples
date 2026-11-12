// The module boutique of the application: its buttons and its routes.
// Generated from the model: change the model, not this file.
import { Page, type ModuleProps } from '@kogitec/core/client'
import { useState } from 'react'
import { Client, Commande, Document, LigneDeCommande } from '../common/entities'
import { ClientScreen } from './ClientScreen'
import { CommandeScreen } from './CommandeScreen'
import { DocumentScreen } from './DocumentScreen'
import { LigneDeCommandeScreen } from './LigneDeCommandeScreen'

// The page of the route documents: it holds its states.
const DocumentPage = () => {
  const [selected, setSelected] = useState<Document>()
  return (
    <Page title='boutique:boutique.route.Document.entityScreen.title' style={{ padding: 0 }}>
      <DocumentScreen
        selected={selected}
        onChange={async (value) => {
          setSelected(value)
        }} />
    </Page>
  )
}

// The page of the route clients: it holds its states.
const ClientPage = () => {
  const [selected, setSelected] = useState<Client>()
  return (
    <Page title='boutique:boutique.route.Client.entityScreen.title' style={{ padding: 0 }}>
      <ClientScreen
        selected={selected}
        onChange={async (value) => {
          setSelected(value)
        }} />
    </Page>
  )
}

// The page of the route commandes: it holds its states.
const CommandePage = () => {
  const [selected, setSelected] = useState<Commande>()
  return (
    <Page title='boutique:boutique.route.Commande.entityScreen.title' style={{ padding: 0 }}>
      <CommandeScreen
        selected={selected}
        onChange={async (value) => {
          setSelected(value)
        }} />
    </Page>
  )
}

// The page of the route lignedecommandes: it holds its states.
const LigneDeCommandePage = () => {
  const [selected, setSelected] = useState<LigneDeCommande>()
  return (
    <Page title='boutique:boutique.route.LigneDeCommande.entityScreen.title' style={{ padding: 0 }}>
      <LigneDeCommandeScreen
        selected={selected}
        onChange={async (value) => {
          setSelected(value)
        }} />
    </Page>
  )
}

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
              <DocumentPage />
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
              <ClientPage />
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
              <CommandePage />
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
              <LigneDeCommandePage />
            )
          }
        ]
      }
    ]
  }
}
