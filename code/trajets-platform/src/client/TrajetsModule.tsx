// The module trajets of the application: its buttons and its routes.
// Generated from the model: change the model, not this file.
import { Page, type ModuleProps } from '@kogitec/core/client'
import { useState } from 'react'
import { Trajet } from '../common/entities'
import { TrajetScreen } from './TrajetScreen'

// The page of the route trajets: it holds its states.
const TrajetPage = () => {
  const [selected, setSelected] = useState<Trajet>()
  return (
    <Page title='trajets:trajets.route.Trajet.entityScreen.title' style={{ padding: 0 }}>
      <TrajetScreen
        selected={selected}
        onChange={async (value) => {
          setSelected(value)
        }} />
    </Page>
  )
}

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
              <TrajetPage />
            )
          }
        ]
      }
    ]
  }
}
