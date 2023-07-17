//buscamos las evoluciones del pokemon
// const pokeEvolutions = async (id) => {
//   const { data: poke } = await pokeApi.get(`/pokemon-species/${id}`)

//   const { data } = await axios.get(poke.evolution_chain.url)

//   const toEvoles = data.chain?.evolves_to[0]?.species.name
//   if (!toEvoles) return poke
//   const lastEvolves = data.chain?.evolves_to[0]?.evolves_to[0]?.species.name
//   if (!lastEvolves) return { toEvoles }
//   console.log({ lastEvolves }, { toEvoles })
//   //capturamos las evoluciones y traemos las imagenes del pokemon
//   //   const { data: preEvolvesImg } = await axios.get(
//   //     `https://pokeapi.co/api/v2/pokemon/${preEvolves}`
//   //   )
//   //   const { data: toEvolvesImg } = await axios.get(
//   //     `https://pokeapi.co/api/v2/pokemon/${toEvolves}`
//   //   )
//   //   const preEvolvesImgUrl = preEvolvesImg.sprites.other.dream_world.front_default
//   //   const toEvolvesImgUrl = toEvolvesImg.sprites.other.dream_world.front_default
//   //   const chain = {
//   //     preEvolves,
//   //     preEvolvesImgUrl,
//   //     toEvolves,
//   //     toEvolvesImgUrl,
//   //     evolves: data.chain?.evolves_to[0]?.species.name
//   //   }
//   //   console.log(chain)
//   //

//   //   return chain
// }

const filterPokemonsByName = (allPokemons, name) => {
  return allPokemons.filter((e) =>
    e.name?.toLowerCase().includes(name.toString().toLowerCase())
  )
}

module.exports = {
  filterPokemonsByName
}
