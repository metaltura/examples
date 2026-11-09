import { Router } from 'express'
import * as service from '../services/ClientService.js'
import type { ClientInput } from '../payloads/Client.js'

const router = Router()

router.get('/', async (req, res, next) => {
  try {
    res.json(await service.list())
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const found = await service.get(req.params.id)
    if (found) {
      res.json(found)
    } else {
      res.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const created = await service.create(req.body as ClientInput)
    res.status(201).json(created)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const found = await service.update(req.params.id, req.body as ClientInput)
    if (found) {
      res.json(found)
    } else {
      res.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    if (await service.remove(req.params.id)) {
      res.status(204).end()
    } else {
      res.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})

export default router
