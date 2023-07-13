const { fetchTypesFromApi } = require('../helpers')
const { Pokemon, Type } = require('../db.js')

const createTypes = async (req, res) => {
  await fetchTypesFromApi()
  const allTypes = await Type.findAll()
  res.send(allTypes)
}
module.exports = { createTypes }
