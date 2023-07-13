const { Router } = require('express')
const { getPokemons, newPokemon, pokemonById } = require('../controllers/pokemonController')
const { createTypes } = require('../controllers/typesController')

const router = Router()

router.get('/pokemons', getPokemons)
router.get('/pokemon/:id', pokemonById)
router.post('/createPokemon', newPokemon)
router.get('/types', createTypes)

module.exports = router
