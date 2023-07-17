const { Router } = require('express')
const {
  getMovesHandler,
  createMoveHandler
} = require('../handlers/movesHandlers')

const movesRouter = Router()
movesRouter.get('/', getMovesHandler)
movesRouter.get('/move', createMoveHandler)
// movesRouter.get('/:id', createMoveHandler)


module.exports = movesRouter
