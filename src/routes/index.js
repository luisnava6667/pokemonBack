const { Router } = require('express')
const pokeRouter = require('./pokemon.routes')
const typeRouter = require('./types.routes')
const movesRouter = require('./moves.routes')
const abilityRouter = require('./abilities.routes')
const gamesRouter = require('./games.routes')

const router = Router()
router.use('/pokemons', pokeRouter)
router.use('/types', typeRouter)
router.use('/moves', movesRouter)
router.use('/ability', abilityRouter)
router.use('/games', gamesRouter)


module.exports = router
