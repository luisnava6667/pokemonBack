const pokeApi = require('../config/pokeApi')
const { Move } = require('../db.js')
const getMoves = async () => {
  const moves = await Move.findAll()
  return moves
}
const createMoveWithAPI = async () => {
  const { data } = await pokeApi.get('/move?limit=100000&offset=0')
  const moves = data.results.map((move) => move.name)
  moves.forEach((type) => {
    Move.findOrCreate({
      where: {
        name: type
      }
    })
  })
  return moves
}
module.exports = {
  getMoves,
  createMoveWithAPI
}
