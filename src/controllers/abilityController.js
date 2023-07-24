const pokeApi = require('../config/pokeApi')
const { Ability } = require('../db.js')
const getAbilityDetail = async (name) => {
  const { data } = await pokeApi.get(`/ability/${name}`)
  const ability = {
    name: data.name,
    description: data.effect_entries[1]
  }
  return ability
}
const getAbilities = async () => {
  const data = await Ability.findAll()
  const abilities = data.map((ability) => ability.name)
  const details = await Promise.all(
    abilities.map((ability) => getAbilityDetail(ability))
  )
  const abilitiesWithDetails =  details.map((ability) => {
    return {
      name: ability.name,
      description: ability.description
        ? ability.description.effect
        : 'No description available'
    }
  })

  return abilitiesWithDetails
}
const createAbilitiesWithAPI = async () => {
  const { data } = await pokeApi.get('/ability?limit=1000000&offset=0')
  const abilities = data.results.map((ability) => ability.name)
  abilities.forEach((ability) => {
    Ability.findOrCreate({
      where: {
        name: ability
      }
    })
  })
  return abilities
}

module.exports = {
  getAbilities,
  createAbilitiesWithAPI
}
