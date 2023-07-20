const pokeApi = require('../config/pokeApi')
const { Type } = require('../db.js')
const getTypes = async () => {
  const types = await Type.findAll()
  return types
}
const createTypeWithAPI = async () => {
  const { data } = await pokeApi.get('/type')
  const types = data.results.map((type) => type.name)
  types.forEach((type) => {
    pokeApi.get(`/type/${type}`).then((response) => {
      const typeData = response.data
      const double_damage_from =
        typeData.damage_relations.double_damage_from.map((type) => type.name)
      const double_damage_to = typeData.damage_relations.double_damage_to.map(
        (type) => type.name
      )
      const half_damage_from = typeData.damage_relations.half_damage_from.map(
        (type) => type.name
      )
      const half_damage_to = typeData.damage_relations.half_damage_to.map(
        (type) => type.name
      )
      const no_damage_from = typeData.damage_relations.no_damage_from.map(
        (type) => type.name
      )
      const no_damage_to = typeData.damage_relations.no_damage_to.map(
        (type) => type.name
      )
      Type.findOrCreate({
        where: {
          name: type,
          double_damage_from: double_damage_from,
          double_damage_to: double_damage_to,
          half_damage_from: half_damage_from,
          half_damage_to: half_damage_to,
          no_damage_from: no_damage_from,
          no_damage_to: no_damage_to
        }
      })
    })
    return types
  })
}
module.exports = {
  getTypes,
  createTypeWithAPI
}
