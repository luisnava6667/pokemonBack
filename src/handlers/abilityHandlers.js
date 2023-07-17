const pokeApi = require('../config/pokeApi')
const { createAbilitiesWithAPI, getAbilities } = require('../controllers/abilityController')

const getAbilityHandler = async (req, res) => {
  try {
    const data = await getAbilities()
    return res.status(200).json(data)
  } catch (error) {
    console.log(error)
  }
}
const createAbilityHandler = async (req, res) => {
  try {
    await createAbilitiesWithAPI()
    res.status(200).send('Abilities Created')
  } catch (error) {
    res.status(500).json(error.message)
  }
}
module.exports = { getAbilityHandler, createAbilityHandler }
