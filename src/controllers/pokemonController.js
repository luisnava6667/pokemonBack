const {
  getAllPokemons,
  getPokemonDetails,
  filterPokemonsByName
} = require('../helpers/index.js')
const { Pokemon, Type } = require('../db.js')

const getPokemons = async (req, res) => {
  try {
    const { name } = req.query
    let allPokemons = await getAllPokemons()
    if (name) {
      let pokemonName = filterPokemonsByName(allPokemons, name)
      if (pokemonName.length) {
        res.status(200).send(pokemonName)
      } else {
        res.status(404).send('Pokemon not found')
      }
    } else {
      res.status(200).send(allPokemons)
    }
  } catch (error) {
    res.status(500).send('Internal Server Error')
  }
}
const newPokemon = async (req, res) => {
  const {
    name,
    image,
    hp,
    attack,
    defense,
    special_attack,
    special_defense,
    speed,
    height,
    weight,
    type
  } = req.body
  const newPokemon = await Pokemon.create({
    name,
    image,
    hp,
    attack,
    defense,
    special_attack,
    special_defense,
    speed,
    height,
    weight
  })
  let typesDb = await Type.findAll({
    where: {
      name: type
    }
  })
  newPokemon.addType(typesDb)
  res.send(newPokemon)
}
const pokemonById = async (req, res) => {
  const { id } = req.params
  try {
    const pokemon = await getPokemonDetails(id)
    if (pokemon) {
      res.status(200).send(pokemon)
    } else {
      res.status(404).send('Pokemon not found')
    }
  } catch (error) {
    console.error(error)
    res.status(500).send('Internal Server Error')
  }
}
module.exports = {
  getPokemons,
  newPokemon,
  pokemonById
}
