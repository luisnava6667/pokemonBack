const { Router } = require('express')
const { getGamesHandler, createGameHandler } = require('../handlers/gamesHandlers')

const gamesRouter = Router()
gamesRouter.get('/', getGamesHandler)
gamesRouter.get('/game', createGameHandler)

module.exports = gamesRouter
