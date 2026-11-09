import express, {
  type NextFunction,
  type Request,
  type Response
} from 'express'
import mongoose from 'mongoose'
import documentRouter from './routes/DocumentRouter.js'
import clientRouter from './routes/ClientRouter.js'
import commandeRouter from './routes/CommandeRouter.js'
import ligneDeCommandeRouter from './routes/LigneDeCommandeRouter.js'

const app = express()
app.use(express.json())
app.use('/api/documents', documentRouter)
app.use('/api/clients', clientRouter)
app.use('/api/commandes', commandeRouter)
app.use('/api/lignedecommandes', ligneDeCommandeRouter)

app.use(
  (error: Error, _req: Request, res: Response, _next: NextFunction) => {
    if (error instanceof mongoose.Error.ValidationError) {
      const errors = Object.fromEntries(
        Object.entries(error.errors)
          .map(([field, reason]) => [field, reason.kind])
      )
      res.status(400).json({ errors })
      return
    }
    res.status(500).json({ error: error.message })
  }
)

const mongoUrl =
  process.env.MONGO_URL ?? 'mongodb://localhost:27017/db'
const port = Number(process.env.PORT ?? 3000)

await mongoose.connect(mongoUrl)
app.listen(port, () => {
  console.log(`boutique listening on http://localhost:${port}`)
})
