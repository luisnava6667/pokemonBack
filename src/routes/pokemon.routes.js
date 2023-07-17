const { Router } = require('express')
const {
  getPokemonHandler,
  getDetailPokemonHandler,
  createPokemonHandler
} = require('../handlers/pokemonHandlers')
const pokeRouter = Router()
pokeRouter.get('/', getPokemonHandler)
pokeRouter.get('/:id', getDetailPokemonHandler)
pokeRouter.post('/', createPokemonHandler)

module.exports = pokeRouter
