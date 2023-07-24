const { default: axios } = require('axios')
const pokeApi = require('../config/pokeApi.js')
const { Pokemon, Type, Move, Ability, Game } = require('../db.js')
const { filterPokemonsByName } = require('../helpers/index.js')

const pokeAttributesForHomeApi = async (url) => {
  const { data } = await axios.get(url)
  const image = data.sprites.other['official-artwork'].front_default
  return {
    id: data.id,
    name: data.name,
    image,
    attack: data.stats[1].base_stat,
    defense: data.stats[2].base_stat,
    types: data.types.map((t) => t.type.name)
  }
}
const pokeEvolutions = async (id) => {
  const {
    data: {
      evolution_chain: { url }
    }
  } = await pokeApi.get(`/pokemon-species/${id}`)
  const {
    data: { chain }
  } = await axios.get(url)
  return chain.evolves_to
}
const characteristics = async (id) => {
  const {
    data: { descriptions }
  } = await pokeApi.get(`/characteristic/${id}`)
  const language = await descriptions.find((d) => d.language.name === 'en')
  return language.description
}
const pokeAttributesApi = async (id) => {
  const { data } = await pokeApi.get(`/pokemon/${id}`)
  const evolution = await pokeEvolutions(id)
  console.log(evolution)
  
  const image = data.sprites.other['official-artwork'].front_default
  return {
    id: data.id,
    name: data.name,
    image,
    characteristic: await characteristics(id),
    hp: data.stats[0].base_stat,
    attack: data.stats[1].base_stat,
    defense: data.stats[2].base_stat,
    special_attack: data.stats[3].base_stat,
    special_defense: data.stats[4].base_stat,
    speed: data.stats[5].base_stat,
    height: data.height,
    weight: data.weight,
    types: data.types.map((t) => t.type.name),
    moves: data.moves.map((m) => m.move.name),
    abilities: data.abilities.map((a) => a.ability.name),
    games: data.game_indices.map((g) => g.version.name)
    // traemos las evoluciones
    // evolutions: await pokeEvolutions(id)
  }
}
const createPokemonDB = async (
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
  types,
  moves,
  games,
  abilities
) => {
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
    characteristic,
    weight
  })
 const [typesDb, movesDb, gamesDb, abilitiesDb] = await Promise.all([
   Type.findAll({
     where: {
       name: types
     }
   }),
   Move.findAll({
     where: {
       name: moves
     }
   }),
   Game.findAll({
     where: {
       name: games
     }
   }),
   Ability.findAll({
     where: {
       name: abilities
     }
   })
 ])

 await Promise.all([
   newPokemon.addType(typesDb),
   newPokemon.addMove(movesDb),
   newPokemon.addGame(gamesDb),
   newPokemon.addAbility(abilitiesDb)
 ])

 return newPokemon
}
const pokeAttributesDB = async (id) => {
  const includeOptions = [
    {
      model: Type,
      attributes: ['name'],
      through: {
        attributes: []
      }
    },
    {
      model: Move,
      attributes: ['name'],
      through: {
        attributes: []
      }
    },
    {
      model: Game,
      attributes: ['name'],
      through: {
        attributes: []
      }
    },
    {
      model: Ability,
      attributes: ['name'],
      through: {
        attributes: []
      }
    }
  ]

  const data = await Pokemon.findByPk(id, {
    include: includeOptions
  })

  const [types, moves, games, abilities] = await Promise.all([
    Promise.resolve(data.Types.map((t) => t.name)),
    Promise.resolve(data.Moves.map((m) => m.name)),
    Promise.resolve(data.Games.map((g) => g.name)),
    Promise.resolve(data.Abilities.map((a) => a.name))
  ])

  return {
    id: data.id,
    name: data.name,
    image: data.image,
    hp: data.hp,
    attack: data.attack,
    defense: data.defense,
    special_attack: data.special_attack,
    special_defense: data.special_defense,
    speed: data.speed,
    height: data.height,
    weight: data.weight,
    types,
    moves,
    abilities,
    games
  }
}
const pokeAttributesForHomeDB = async () => {
  const data = await Pokemon.findAll({
    include: {
      model: Type,
      attributes: ['name'],
      through: {
        attributes: []
      }
    }
  })
  return data.map((pokemon) => ({
    id: pokemon.id,
    name: pokemon.name,
    image: pokemon.image,
    attack: pokemon.attack,
    defense: pokemon.defense,
    types: pokemon.Types.map((type) => type.name)
  }))
}
const getPokemonById = async (id) => {
  if (id < 20000) {
    const data = await pokeAttributesApi(id)
    return data
  } else {
    const data = pokeAttributesDB(id)
    return data
  }
}
const getPokeApi = async () => {
  const {
    data: { results }
  } = await pokeApi.get('/pokemon?limit=4')
  const url = results.map((e) => e.url)
  const pokeResult = await Promise.all(
    url.map((url) => pokeAttributesForHomeApi(url))
  )
  return pokeResult
}
const getPokeDb = async () => {
  const data = await pokeAttributesForHomeDB()
  return data
}
const getAllPokemons = async () => {
  const apiInfo = await getPokeApi()
  const dbInfo = await getPokeDb()
  const total = dbInfo.concat(apiInfo)
  return total
}
const getPokemonByName = async (name) => {
  const allPokemons = await getAllPokemons()
  const pokemonName = filterPokemonsByName(allPokemons, name)
  if (pokemonName === '' || pokemonName.length === 0) {
    return 'Pokemon not found'
  }
  return pokemonName
}
module.exports = {
  createPokemonDB,
  getPokemonById,
  getAllPokemons,
  getPokemonByName
}