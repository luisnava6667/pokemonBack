const axios = require('axios')
const pokeApi = require('../config/pokeApi')
const { Pokemon, Type } = require('../db.js')

const pokeAtributesForHome = async (url) => {
  const { data } = await axios.get(url)
  const weight = data.weight / 10 + 'kg'
  const height = data.height / 10 + 'm'
  //   1 milla es aproximadamente igual a 1.609 kilómetros.
  const speed = data.stats[5].base_stat * 1.609 + 'km/h'
  return {
    id: data.id,
    name: data.name,
    image: data.sprites.other.dream_world.front_default,
    hp: data.stats[0].base_stat,
    attack: data.stats[1].base_stat,
    defense: data.stats[2].base_stat,
    speed,
    height,
    weight,
    types: data.types.map((t) => t.type.name)
  }
}
//buscamos las evoluciones del pokemon
const pokeEvolutions = async (id) => {
  const { data: poke } = await pokeApi.get(`/pokemon-species/${id}`)

  const { data } = await axios.get(poke.evolution_chain.url)

  const toEvoles = data.chain?.evolves_to[0]?.species.name
  if (!toEvoles) return poke
  const lastEvolves = data.chain?.evolves_to[0]?.evolves_to[0]?.species.name
  if (!lastEvolves) return { toEvoles }
  console.log({ lastEvolves }, { toEvoles })
  //capturamos las evoluciones y traemos las imagenes del pokemon
  //   const { data: preEvolvesImg } = await axios.get(
  //     `https://pokeapi.co/api/v2/pokemon/${preEvolves}`
  //   )
  //   const { data: toEvolvesImg } = await axios.get(
  //     `https://pokeapi.co/api/v2/pokemon/${toEvolves}`
  //   )
  //   const preEvolvesImgUrl = preEvolvesImg.sprites.other.dream_world.front_default
  //   const toEvolvesImgUrl = toEvolvesImg.sprites.other.dream_world.front_default
  //   const chain = {
  //     preEvolves,
  //     preEvolvesImgUrl,
  //     toEvolves,
  //     toEvolvesImgUrl,
  //     evolves: data.chain?.evolves_to[0]?.species.name
  //   }
  //   console.log(chain)
  //

  //   return chain
}
const pokeAtrributesForDetail = async (id) => {
  const { data } = await pokeApi.get(`/pokemon/${id}`)

  const weight = data.weight / 10 + 'kg'
  const height = data.height / 10 + 'm'
  //   1 milla es aproximadamente igual a 1.609 kilómetros.
  const speed = (data.stats[5].base_stat * 1.609).toFixed(2) + 'km/h'
  return {
    id: data.id,
    name: data.name,
    image: data.sprites.other.dream_world.front_default,
    hp: data.stats[0].base_stat,
    attack: data.stats[1].base_stat,
    defense: data.stats[2].base_stat,
    special_attack: data.stats[3].base_stat,
    special_defense: data.stats[4].base_stat,
    speed,
    height,
    weight,
    types: data.types.map((t) => t.type.name),
    moves: data.moves.map((m) => m.move.name),
    abilities: data.abilities.map((a) => a.ability.name),
    games: data.game_indices.map((g) => g.version.name)
    // traemos las evoluciones
    // evolutions: await pokeEvolutions(id)
  }
}
const getPokeApi = async () => {
  const {
    data: { results }
  } = await pokeApi.get('/pokemon?limit=4&offset=0')
  const url = results.map((e) => e.url)
  const pokeResult = await Promise.all(
    url.map((url) => pokeAtributesForHome(url))
  )
  return pokeResult
}
const getPokeDb = async () => {
  const pokemons = await Pokemon.findAll({
    include: {
      model: Type,
      attributes: ['name'],
      through: {
        attributes: []
      }
    }
  })
  return pokemons
}
const getAllPokemons = async () => {
  const apiInfo = await getPokeApi()
  const dbInfo = await getPokeDb()
  const total = apiInfo.concat(dbInfo)
  return total
}
const fetchTypesFromApi = async () => {
  const { data } = await axios.get('https://pokeapi.co/api/v2/type')
  const types = data.results.map((e) => e.name)
  const typesEach = types.map((e) => {
    for (let i = 0; i < e.length; i++) return e
  })

  typesEach.forEach((e) => {
    Type.findOrCreate({
      where: {
        name: e
      }
    })
  })
}
const getPokemonDetails = async (id) => {
  if (id < 1100) {
    return await pokeAtrributesForDetail(id)
  } else {
    return await Pokemon.findByPk(id)
  }
}
const filterPokemonsByName = (allPokemons, name) => {
  return allPokemons.filter((e) =>
    e.name?.toLowerCase().includes(name.toString().toLowerCase())
  )
}
module.exports = {
  pokeAtributesForHome,
  pokeAtrributesForDetail,
  getPokeApi,
  getAllPokemons,
  fetchTypesFromApi,
  getPokemonDetails,
  filterPokemonsByName
}
