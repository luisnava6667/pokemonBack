const pokeApi = require('../config/pokeApi')
const { Game } = require('../db.js')
const getGames = async () => {
  const games = await Game.findAll()
  return games
}
const createGamesWithAPI = async () => {
  const { data } = await pokeApi.get('/version?limit=100000&offset=0')
  const games = data.results.map((game) => game.name)
  games.forEach((game) => {
    Game.findOrCreate({
      where: {
        name: game
      }
    })
  })
  return games
}
module.exports = {
  getGames,
  createGamesWithAPI
}
