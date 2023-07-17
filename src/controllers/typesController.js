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
    Type.findOrCreate({
      where: {
        name: type
      }
    })
  })
  return types
}
module.exports = {
  getTypes,
  createTypeWithAPI
}
