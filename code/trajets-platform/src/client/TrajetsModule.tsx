// The module trajets of the application: its buttons and its routes.
// Generated from the model: change the model, not this file.
import type { ModuleProps } from '@kogitec/core/client'
import { Trajet } from '../common/entities'
import { EntityScreen } from './EntityScreen'

export const TrajetsModule: ModuleProps = {
  name: 'trajets',
  title: 'trajets:trajets.title',
  buttons: [
    { title: 'trajets:trajets.Trajet.title', path: '/trajets/trajets' }
  ],
  route: {
    path: 'trajets',
    children: [
      {
        path: 'trajets',
        children: [
          {
            index: true,
            element: (
              <EntityScreen title='trajets:trajets.route.Trajet.entityScreen.title' entity={Trajet} />
            )
          }
        ]
      }
    ]
  }
}
