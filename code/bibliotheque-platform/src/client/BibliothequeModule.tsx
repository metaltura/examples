// The module bibliotheque of the application: its buttons and its routes.
// Generated from the model: change the model, not this file.
import { Page, type ModuleProps } from '@kogitec/core/client'
import { useState } from 'react'
import { Auteur, Lecteur, Livre } from '../common/entities'
import { AuteurScreen } from './AuteurScreen'
import { LecteurScreen } from './LecteurScreen'
import { LivreScreen } from './LivreScreen'

// The page of the route auteurs: it holds its states.
const AuteurPage = () => {
  const [selected, setSelected] = useState<Auteur>()
  return (
    <Page title='bibliotheque:bibliotheque.route.Auteur.entityScreen.title' style={{ padding: 0 }}>
      <AuteurScreen
        selected={selected}
        onChange={async (value) => {
          setSelected(value)
        }} />
    </Page>
  )
}

// The page of the route livres: it holds its states.
const LivrePage = () => {
  const [selected, setSelected] = useState<Livre>()
  return (
    <Page title='bibliotheque:bibliotheque.route.Livre.entityScreen.title' style={{ padding: 0 }}>
      <LivreScreen
        selected={selected}
        onChange={async (value) => {
          setSelected(value)
        }} />
    </Page>
  )
}

// The page of the route lecteurs: it holds its states.
const LecteurPage = () => {
  const [selected, setSelected] = useState<Lecteur>()
  return (
    <Page title='bibliotheque:bibliotheque.route.Lecteur.entityScreen.title' style={{ padding: 0 }}>
      <LecteurScreen
        selected={selected}
        onChange={async (value) => {
          setSelected(value)
        }} />
    </Page>
  )
}

export const BibliothequeModule: ModuleProps = {
  name: 'bibliotheque',
  title: 'bibliotheque:bibliotheque.title',
  buttons: [
    { title: 'bibliotheque:bibliotheque.Auteur.title', path: '/bibliotheque/auteurs' },
    { title: 'bibliotheque:bibliotheque.Livre.title', path: '/bibliotheque/livres' },
    { title: 'bibliotheque:bibliotheque.Lecteur.title', path: '/bibliotheque/lecteurs' }
  ],
  route: {
    path: 'bibliotheque',
    children: [
      {
        path: 'auteurs',
        children: [
          {
            index: true,
            element: (
              <AuteurPage />
            )
          }
        ]
      },
      {
        path: 'livres',
        children: [
          {
            index: true,
            element: (
              <LivrePage />
            )
          }
        ]
      },
      {
        path: 'lecteurs',
        children: [
          {
            index: true,
            element: (
              <LecteurPage />
            )
          }
        ]
      }
    ]
  }
}
