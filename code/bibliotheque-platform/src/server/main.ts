import { createServer, Logger } from '@kogitec/core/server'
import { securityServerModule } from '@kogitec/security/server'
// Declaring the schemas registers them: the platform serves the documents
// of each one, which the lists and the forms read and write.
import '../common/entities'
// The publications the screens subscribe to.
import './publications'

// `security` brings `socket` and `schema` with it. Listens on PORT, else
// 8081; MongoDB and the sign-in are optional in development.
createServer({ modules: [securityServerModule] }).catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error)
  Logger.error(`server not started: ${message}`)
  process.exit(1)
})
