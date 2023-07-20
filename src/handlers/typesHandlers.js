const {
  createTypeWithAPI,
  getTypes
} = require('../controllers/typesController')

const getTypesHandler = async (req, res) => {
  try {
    const data = await getTypes()
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json(error.message)
  }
}
const getDetailTypeHandler = async (req, res) => {
  const { id } = req.params
  res.status(200).send(`getDetailTypeHandler ${id}`)
}
const createTypeHandler = async (req, res) => {
  try {
    const types = await createTypeWithAPI()
    res.status(200).send(types)
  } catch (error) {
    res.status(500).json(error.message)
  }
}
module.exports = {
  getTypesHandler,
  getDetailTypeHandler,
  createTypeHandler
}
