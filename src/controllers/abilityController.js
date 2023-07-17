const pokeApi = require('../config/pokeApi')
const { Ability } = require('../db.js')
const getAbilities = async () => {
  const abilities = await Ability.findAll()
  return abilities
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
