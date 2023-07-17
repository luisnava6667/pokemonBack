const pokeApi = require('../config/pokeApi')
const { getMoves, createMoveWithAPI } = require('../controllers/movesController')

const getMovesHandler = async (req, res) => {
  try {
    const data = await getMoves()
    res.status(200).json(data)
  } catch (error) {
    console.log(error)
  }
}
const createMoveHandler = async (req, res) => {
  try {
    await createMoveWithAPI()
    res.status(200).send('Moves Created')
  } catch (error) {
    res.status(500).json(error.message)
  }
}
module.exports = { getMovesHandler, createMoveHandler }
