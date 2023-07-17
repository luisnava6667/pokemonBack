const { Router } = require('express')
const { getTypesHandler, getDetailTypeHandler, createTypeHandler } = require('../handlers/typesHandlers')
const typeRouter = Router()
typeRouter.get('/', getTypesHandler)
typeRouter.get('/type', createTypeHandler)
// typeRouter.get('/:id', getDetailTypeHandler)

module.exports = typeRouter
