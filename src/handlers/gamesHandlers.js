const pokeApi = require('../config/pokeApi')
const { getGames, createGamesWithAPI } = require('../controllers/gamesController')

const getGamesHandler = async (req, res) => {
  try {
    const data = await getGames()

    return res.status(200).json(data)
  } catch (error) {
    res.status(500).json(error.message)
  }
}
const createGameHandler = async (req, res) => {
  try {
    await createGamesWithAPI()
    res.status(200).send('Games Created')
  } catch (error) {
    res.status(500).json(error.message)
  }
}
module.exports = { getGamesHandler, createGameHandler }
