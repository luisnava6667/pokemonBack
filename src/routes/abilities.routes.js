const { Router } = require('express')
const {getAbilityHandler, createAbilityHandler} = require('../handlers/abilityHandlers')

const abilityRouter = Router()
abilityRouter.get('/', getAbilityHandler)
abilityRouter.get('/ability', createAbilityHandler)


module.exports = abilityRouter
