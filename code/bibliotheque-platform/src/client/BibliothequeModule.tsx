// The module bibliotheque of the application: its buttons and its routes.
// Generated from the model: change the model, not this file.
import type { ModuleProps } from '@kogitec/core/client'
import { Auteur, Lecteur, Livre } from '../common/entities'
import { EntityScreen } from './EntityScreen'

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
              <EntityScreen title='bibliotheque:bibliotheque.route.Auteur.entityScreen.title' entity={Auteur} />
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
              <EntityScreen title='bibliotheque:bibliotheque.route.Livre.entityScreen.title' entity={Livre} />
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
              <EntityScreen title='bibliotheque:bibliotheque.route.Lecteur.entityScreen.title' entity={Lecteur} />
            )
          }
        ]
      }
    ]
  }
}
