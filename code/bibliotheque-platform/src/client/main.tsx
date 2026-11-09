import { AuthGate } from '@kogitec/security/client'
import { Application, createI18n } from '@kogitec/workbench/client'
import { createRoot } from 'react-dom/client'
import { resources } from '../common/i18n'
import { BibliothequeModule } from './BibliothequeModule'

// The platform's texts, then the application's own.
const i18n = createI18n(resources)

createRoot(document.getElementById('react-target')!).render(
  <AuthGate>
    <Application
      name='Bibliotheque'
      logo=''
      i18n={i18n}
      modules={[BibliothequeModule]}
    />
  </AuthGate>
)
