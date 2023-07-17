const {
  createPokemonDB,
  getPokemonById,
  getAllPokemons,
  getPokemonByName
} = require('../controllers/pokemonController')

const getPokemonHandler = async (req, res) => {
  const { name } = req.query
  try {
    if (name) {
      const response = await getPokemonByName(name)
      res.status(200).send(response)
    } else {
      const response = await getAllPokemons()
      res.status(200).send(response)
    }
  } catch (error) {
    res.status(500).json(error.message)
  }
}

const getDetailPokemonHandler = async (req, res) => {
  const { id } = req.params
  try {
    const response = await getPokemonById(id)
    if (response === null) {
      res.status(404).json('Pokemon not found')
    } else {
      res.status(200).json(response)
    }
  } catch (error) {
    res.status(500).json(error.message)
  }
}
const createPokemonHandler = async (req, res) => {
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
    characteristic,
    types
  } = req.body
  try {
    const response = await createPokemonDB(
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
      characteristic,
      types
    )
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json(error.message)
  }
}
module.exports = {
  getPokemonHandler,
  getDetailPokemonHandler,
  createPokemonHandler
}
